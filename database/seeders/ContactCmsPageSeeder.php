<?php

namespace Database\Seeders;

use App\Models\CmsPage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactCmsPageSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CmsPage::updateOrCreate(
            ['slug' => 'contact-page'],
            [
                'title' => 'Contact Page - Get in Touch',
                'slug' => 'contact-page',
                'page_type' => 'contact',
                'content' => [
                    'phone' => '+91 9016393892',
                    'email' => 'empireoholidays@gmail.com',
                    'whatsapp' => '9016393892',
                    'business_hours' => "Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM",
                    'address' => '',
                ],
                'meta_data' => [
                    'meta_title' => 'Contact Us - Empireo Holidays',
                    'meta_description' => 'Get in touch with Empireo Holidays for travel inquiries, bookings, and support.',
                ],
                'is_published' => true,
            ]
        );

        $this->command?->info('Contact page CMS seeded successfully!');
    }
}


