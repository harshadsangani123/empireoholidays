<?php

namespace Database\Seeders;

use App\Models\CmsPage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomeCmsPageSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CmsPage::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Home Page',
                'slug' => 'home',
                'page_type' => 'home',
                'content' => [
                    // Default hero background images for the home page hero slider.
                    // You can change these later from the admin panel.
                    'hero_background' => [
                        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=1080&fit=crop',
                        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop',
                        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop',
                    ],
                ],
                'meta_data' => [
                    'meta_title' => 'Empireo Holidays - Home',
                    'meta_description' => 'Empireo Holidays offers curated domestic and international holiday packages with personalized service.',
                ],
                'is_published' => true,
            ]
        );

        $this->command?->info('Home CMS page seeded successfully!');
    }
}


