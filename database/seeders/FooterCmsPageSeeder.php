<?php

namespace Database\Seeders;

use App\Models\CmsPage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FooterCmsPageSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $footerPages = [
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'page_type' => 'footer',
                'content' => [
                    'heading' => 'Privacy Policy',
                    'description' => 'At Empireo Holidays, we are committed to protecting your privacy and ensuring the security of your personal information.',
                    'sections' => [
                        [
                            'title' => 'Information We Collect',
                            'content' => 'We collect information that you provide directly to us, including your name, email address, phone number, and travel preferences when you make inquiries or bookings.'
                        ],
                        [
                            'title' => 'How We Use Your Information',
                            'content' => 'We use your information to process bookings, send confirmations, provide customer support, and improve our services.'
                        ],
                        [
                            'title' => 'Data Security',
                            'content' => 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
                        ],
                        [
                            'title' => 'Contact Us',
                            'content' => 'If you have any questions about this Privacy Policy, please contact us at empireoholidays@gmail.com'
                        ]
                    ]
                ],
                'meta_data' => [
                    'meta_title' => 'Privacy Policy - Empireo Holidays',
                    'meta_description' => 'Read our privacy policy to understand how Empireo Holidays collects, uses, and protects your personal information.',
                    'meta_keywords' => 'privacy policy, data protection, personal information'
                ],
                'is_published' => true,
            ],
            [
                'title' => 'Terms & Conditions',
                'slug' => 'terms-conditions',
                'page_type' => 'footer',
                'content' => [
                    'heading' => 'Terms & Conditions',
                    'description' => 'Please read these terms and conditions carefully before using our services.',
                    'sections' => [
                        [
                            'title' => 'Booking Terms',
                            'content' => 'All bookings are subject to availability and confirmation. Prices are subject to change without notice until booking is confirmed.'
                        ],
                        [
                            'title' => 'Payment Terms',
                            'content' => 'Payment terms vary by package. A deposit may be required to confirm your booking, with the balance due before travel.'
                        ],
                        [
                            'title' => 'Cancellation Policy',
                            'content' => 'Cancellation policies vary by package. Please refer to your booking confirmation for specific cancellation terms and refund policies.'
                        ],
                        [
                            'title' => 'Travel Documents',
                            'content' => 'It is your responsibility to ensure you have valid travel documents, including passports, visas, and health certificates as required.'
                        ],
                        [
                            'title' => 'Liability',
                            'content' => 'Empireo Holidays acts as an agent for travel service providers. We are not liable for any loss, damage, or injury during your travel.'
                        ]
                    ]
                ],
                'meta_data' => [
                    'meta_title' => 'Terms & Conditions - Empireo Holidays',
                    'meta_description' => 'Read our terms and conditions for booking travel packages with Empireo Holidays.',
                    'meta_keywords' => 'terms conditions, booking terms, travel terms'
                ],
                'is_published' => true,
            ],
            [
                'title' => 'About Us',
                'slug' => 'about-us',
                'page_type' => 'footer',
                'content' => [
                    'heading' => 'About Empireo Holidays',
                    'description' => 'Empireo Holidays is your trusted travel partner, dedicated to creating unforgettable travel experiences.',
                    'sections' => [
                        [
                            'title' => 'Our Mission',
                            'content' => 'To provide exceptional travel experiences that create lasting memories for our customers, with a focus on quality, service, and value.'
                        ],
                        [
                            'title' => 'Why Choose Us',
                            'content' => 'We offer carefully curated travel packages, competitive prices, 24/7 customer support, and years of experience in the travel industry.'
                        ],
                        [
                            'title' => 'Our Services',
                            'content' => 'We specialize in both domestic and international travel packages, including group tours, customized itineraries, and special occasion travel.'
                        ]
                    ]
                ],
                'meta_data' => [
                    'meta_title' => 'About Us - Empireo Holidays',
                    'meta_description' => 'Learn about Empireo Holidays, your trusted travel partner for domestic and international holiday packages.',
                    'meta_keywords' => 'about us, travel company, holiday packages'
                ],
                'is_published' => true,
            ],
            [
                'title' => 'Contact Us',
                'slug' => 'contact-us',
                'page_type' => 'footer',
                'content' => [
                    'heading' => 'Get in Touch',
                    'description' => 'We are here to help you plan your perfect holiday. Contact us through any of the following methods.',
                    'sections' => [
                        [
                            'title' => 'Email',
                            'content' => 'Email us at empireoholidays@gmail.com for inquiries and bookings.'
                        ],
                        [
                            'title' => 'Phone',
                            'content' => 'Call us at +9016393892 for immediate assistance.'
                        ],
                        [
                            'title' => 'Business Hours',
                            'content' => 'Monday - Sunday: 9:00 AM - 7:00 PM'
                        ],
                        [
                            'title' => 'WhatsApp',
                            'content' => 'Chat with us on WhatsApp for quick responses to your travel queries.'
                        ]
                    ]
                ],
                'meta_data' => [
                    'meta_title' => 'Contact Us - Empireo Holidays',
                    'meta_description' => 'Contact Empireo Holidays for travel inquiries, bookings, and customer support.',
                    'meta_keywords' => 'contact us, travel inquiry, customer support'
                ],
                'is_published' => true,
            ],
        ];

        foreach ($footerPages as $page) {
            CmsPage::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }

        $this->command->info('Footer CMS pages seeded successfully!');
    }
}

