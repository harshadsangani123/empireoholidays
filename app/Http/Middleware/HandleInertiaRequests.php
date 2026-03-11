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
        // Prefer contact page CMS data for global contact details
        $contactPage = CmsPage::where('page_type', 'contact')
            ->where('is_published', true)
            ->first();

        // Fallback to any footer-type CMS page if contact page is missing
        if (! $contactPage) {
            $contactPage = CmsPage::where('page_type', 'footer')
                ->where('is_published', true)
                ->first();
        }

        if ($contactPage) {
            $footerContactData = [
                'phone' => $contactPage->getContentField('phone', '+1 234 567 890'),
                'email' => $contactPage->getContentField('email', 'info@empireoholidays.com'),
                'whatsapp' => $contactPage->getContentField('whatsapp', '1234567890'),
                'business_hours' => $contactPage->getContentField('business_hours', 'Monday - Sunday: 9:00 AM - 8:00 PM'),
                'address' => $contactPage->getContentField('address', ''),
                'social' => [
                    'facebook' => $contactPage->getContentField('facebook', 'https://www.facebook.com/'),
                    'instagram' => $contactPage->getContentField('instagram', 'https://www.instagram.com/'),
                    'linkedin' => $contactPage->getContentField('linkedin', 'https://www.linkedin.com/'),
                ],
            ];
        } else {
            // Fallback to default values if no CMS page exists
            $footerContactData = [
                'phone' => '+1 234 567 890',
                'email' => 'info@empireoholidays.com',
                'whatsapp' => '1234567890',
                'business_hours' => 'Monday - Sunday: 9:00 AM - 8:00 PM',
                'address' => '',
                'social' => [
                    'facebook' => 'https://www.facebook.com/',
                    'instagram' => 'https://www.instagram.com/',
                    'linkedin' => 'https://www.linkedin.com/',
                ],
            ];
        }

        return [
            ...parent::share($request),
            'footerContact' => $footerContactData,
        ];
    }
}
