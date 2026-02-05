<?php

namespace App\Http\Middleware;

use App\Models\CmsPage;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Fetch footer Contact Us CMS data
        $footerContact = CmsPage::where('page_type', 'footer')
            ->where('is_published', true)
            ->first();

        $footerContactData = null;
        if ($footerContact) {
            $footerContactData = [
                'phone' => $footerContact->getContentField('phone', '+1 234 567 890'),
                'email' => $footerContact->getContentField('email', 'info@empireoholidays.com'),
                'whatsapp' => $footerContact->getContentField('whatsapp', '1234567890'),
                'business_hours' => $footerContact->getContentField('business_hours', 'Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM'),
                'address' => $footerContact->getContentField('address', ''),
            ];
        } else {
            // Fallback to default values if no CMS page exists
            $footerContactData = [
                'phone' => '+1 234 567 890',
                'email' => 'info@empireoholidays.com',
                'whatsapp' => '1234567890',
                'business_hours' => 'Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM',
                'address' => '',
            ];
        }

        return [
            ...parent::share($request),
            'footerContact' => $footerContactData,
        ];
    }
}
