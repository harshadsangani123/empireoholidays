<?php

namespace App\Http\Controllers;

use App\Mail\PackageInquiryMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class InquiryController extends Controller
{
    /**
     * Display the inquiry form page
     */
    public function show(string $type, int $id)
    {
        $package = \App\Models\Package::where('type', $type)
            ->where('id', $id)
            ->published()
            ->firstOrFail();

        return inertia('PackageInquiry', [
            'package' => [
                'id' => $package->id,
                'name' => $package->name,
                'type' => $package->type,
                'country' => $package->country,
                'state' => $package->state,
            ],
            'recaptchaSiteKey' => config('services.recaptcha.site_key'),
        ]);
    }

    /**
     * Handle inquiry form submission
     */
    public function store(Request $request)
    {
        // Verify reCAPTCHA if configured
        $recaptchaSecretKey = config('services.recaptcha.secret_key');
        if ($recaptchaSecretKey) {
            $recaptchaResponse = $request->input('g-recaptcha-response');
            
            if (!$recaptchaResponse) {
                return back()->withErrors([
                    'g-recaptcha-response' => 'Please complete the reCAPTCHA verification.',
                ])->withInput();
            }
            
            // Verify reCAPTCHA with Google
            $verifyResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $recaptchaSecretKey,
                'response' => $recaptchaResponse,
                'remoteip' => $request->ip(),
            ]);
            
            $verifyResult = $verifyResponse->json();
            
            if (!isset($verifyResult['success']) || !$verifyResult['success']) {
                return back()->withErrors([
                    'g-recaptcha-response' => 'reCAPTCHA verification failed. Please try again.',
                ])->withInput();
            }
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'travel_date' => 'nullable|date|after_or_equal:today',
            'number_of_travelers' => 'nullable|integer|min:1|max:50',
            'message_text' => 'nullable|string|max:2000',
            'package_id' => 'required|exists:packages,id',
            'package_name' => 'required|string',
            'package_type' => 'required|in:international,domestic',
        ], [
            'name.required' => 'Please enter your name.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'phone.required' => 'Please enter your phone number.',
            'travel_date.date' => 'Please enter a valid travel date.',
            'travel_date.after_or_equal' => 'Travel date must be today or in the future.',
            'number_of_travelers.integer' => 'Number of travelers must be a valid number.',
            'number_of_travelers.min' => 'Number of travelers must be at least 1.',
            'package_id.exists' => 'Invalid package selected.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $inquiryData = $validator->validated();
            
            // Get the inquiry email from config, fallback to admin email
            $inquiryEmail = config('mail.inquiry_email');
            
            // Determine which mailer to use (Brevo if configured, otherwise default)
            $useBrevo = config('services.brevo.smtp_username') && config('services.brevo.smtp_password');
            $mail = $useBrevo ? Mail::mailer('brevo') : Mail::mailer();
            
            // Send email using specified mailer
            $mail->to($inquiryEmail)->send(new PackageInquiryMail($inquiryData));

            return back()->with('success', true);
        } catch (\Exception $e) {
            \Log::error('Inquiry email failed: ' . $e->getMessage());
            
            return back()->withErrors([
                'message' => 'Sorry, there was an error sending your inquiry. Please try again later or contact us directly.',
            ])->withInput();
        }
    }
}
