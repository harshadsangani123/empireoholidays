<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\ContactFormMail;

class HomeController extends Controller
{
    /**
     * Display the home page
     */
    public function index()
    {
        return Inertia::render('Home', [
            'featuredInternational' => Package::international()
                ->published()
                ->featured()
                ->orderBy('sort_order')
                ->limit(4)
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
            'featuredDomestic' => Package::domestic()
                ->published()
                ->featured()
                ->orderBy('sort_order')
                ->limit(4)
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
        ]);
    }

    /**
     * Display the about us page
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /**
     * Display the international holidays page
     */
    public function international()
    {
        return Inertia::render('International', [
            'packages' => Package::international()
                ->published()
                ->orderBy('sort_order')
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
        ]);
    }

    /**
     * Display the domestic holidays page
     */
    public function domestic()
    {
        return Inertia::render('Domestic', [
            'packages' => Package::domestic()
                ->published()
                ->orderBy('sort_order')
                ->get()
                ->map(fn($pkg) => $this->formatPackageForFrontend($pkg)),
        ]);
    }

    /**
     * Display the contact us page
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }

    /**
     * Handle Contact Us form submission
     */
    public function submitContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|min:10|max:2000',
        ], [
            'name.required' => 'Please enter your name.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'phone.required' => 'Please enter your phone number.',
            'message.required' => 'Please enter your message.',
            'message.min' => 'Message must be at least 10 characters.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $data = $validator->validated();

            // Get the inquiry email from config, fallback to app from address
            $inquiryEmail = config('mail.inquiry_email') ?: config('mail.from.address');

            // Determine which mailer to use (Brevo if configured, otherwise default)
            $brevoUsername = config('services.brevo.smtp_username');
            $brevoPassword = config('services.brevo.smtp_password');
            $brevoMailerUsername = config('mail.mailers.brevo.username');
            $useBrevo = !empty($brevoUsername) && !empty($brevoPassword);
            
            // Log configuration for debugging
            \Log::info('Brevo config check - services.brevo.smtp_username: ' . ($brevoUsername ? substr($brevoUsername, 0, 3) . '***' : 'NOT SET'));
            \Log::info('Brevo config check - mail.mailers.brevo.username: ' . ($brevoMailerUsername ? substr($brevoMailerUsername, 0, 3) . '***' : 'NOT SET'));
            
            if ($useBrevo) {
                // Verify the mailer config matches and check for common misconfigurations
                if ($brevoMailerUsername !== $brevoUsername) {
                    \Log::warning('Brevo username mismatch! services.brevo: ' . substr($brevoUsername, 0, 3) . '*** vs mail.mailers.brevo: ' . ($brevoMailerUsername ? substr($brevoMailerUsername, 0, 3) . '***' : 'NOT SET'));
                }
                
                // Check if username looks like a Gmail address (common mistake)
                if (str_contains(strtolower($brevoMailerUsername), '@gmail.com')) {
                    \Log::error('BREVO_SMTP_USERNAME appears to be a Gmail address! It should be your Brevo SMTP username, not your Gmail.');
                }
                
                \Log::info('Using Brevo mailer');
            } else {
                \Log::info('Using default mailer (Brevo not configured)');
            }
            
            $mail = $useBrevo ? Mail::mailer('brevo') : Mail::mailer();

            $mail->to($inquiryEmail)
                ->send(new ContactFormMail($data));

            return back()->with('success', true);
        } catch (\Exception $e) {
            \Log::error('Contact email failed: ' . $e->getMessage());
            \Log::error('Contact email failed - Stack trace: ' . $e->getTraceAsString());

            return back()->withErrors([
                'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly.',
            ])->withInput();
        }
    }

    /**
     * Display package detail page
     */
    public function packageDetail(string $type, int $id)
    {
        $package = Package::where('type', $type)
            ->where('id', $id)
            ->published()
            ->first();

        if (!$package) {
            abort(404, 'Package not found');
        }

        return Inertia::render('PackageDetail', [
            'package' => $this->formatPackageForDetail($package),
        ]);
    }

    /**
     * Format package data for frontend (card view)
     */
    private function formatPackageForFrontend(Package $package): array
    {
        return [
            'id' => $package->id,
            'name' => $package->name,
            'country' => $package->country,
            'state' => $package->state,
            'description' => $package->description,
            'image' => $package->main_image_url ?? $package->image,
            'price_per_person' => $package->price_per_person,
            'currency' => $package->currency,
            'duration' => $package->duration,
            'type' => $package->type,
        ];
    }

    /**
     * Format package data for detail page
     */
    private function formatPackageForDetail(Package $package): array
    {
        return [
            'id' => $package->id,
            'name' => $package->name,
            'country' => $package->country,
            'state' => $package->state,
            'description' => $package->description,
            'detailedDescription' => $package->getDetailedDescription(),
            'image' => $package->main_image_url ?? $package->image,
            'photos' => $package->photos,
            'price_per_person' => $package->price_per_person,
            'currency' => $package->currency,
            'duration' => $package->duration,
            'inclusions' => $package->inclusions ?? [],
            'exclusions' => $package->exclusions ?? [],
            'itinerary' => $package->itinerary ?? [],
            'type' => $package->type,
        ];
    }
}

