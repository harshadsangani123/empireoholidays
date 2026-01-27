<?php

namespace App\Data;

class Packages
{
    /**
     * Get all international holiday packages
     *
     * @return array
     */
    public static function getInternationalPackages(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Paris',
                'country' => 'France',
                'description' => 'Experience the romance and charm of the City of Light. Visit iconic landmarks, enjoy world-class cuisine, and immerse yourself in art and culture.',
                'image' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
            ],
            [
                'id' => 2,
                'name' => 'Dubai',
                'country' => 'UAE',
                'description' => 'Discover luxury and innovation in the heart of the Middle East. From stunning skyscrapers to desert adventures, Dubai offers unforgettable experiences.',
                'image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
            ],
            [
                'id' => 3,
                'name' => 'Maldives',
                'country' => 'Maldives',
                'description' => 'Escape to paradise with crystal-clear waters, pristine beaches, and luxurious overwater villas. Perfect for a romantic getaway or relaxation.',
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            ],
            [
                'id' => 4,
                'name' => 'Singapore',
                'country' => 'Singapore',
                'description' => 'Explore a vibrant city-state where modern architecture meets rich cultural heritage. Enjoy amazing food, shopping, and entertainment.',
                'image' => 'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=800&h=600&fit=crop',
            ],
            [
                'id' => 5,
                'name' => 'Europe Tour',
                'country' => 'Multiple Countries',
                'description' => 'Embark on an unforgettable journey through Europe. Visit multiple countries, experience diverse cultures, and create lasting memories.',
                'image' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
            ],
        ];
    }

    /**
     * Get all domestic holiday packages
     *
     * @return array
     */
    public static function getDomesticPackages(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Goa',
                'state' => 'Goa',
                'description' => 'Relax on beautiful beaches, enjoy vibrant nightlife, and savor delicious seafood. Goa offers the perfect blend of relaxation and fun.',
                'image' => 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
            ],
            [
                'id' => 2,
                'name' => 'Manali',
                'state' => 'Himachal Pradesh',
                'description' => 'Experience the beauty of the Himalayas. Enjoy snow-capped mountains, adventure sports, and serene landscapes in this hill station paradise.',
                'image' => 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            ],
            [
                'id' => 3,
                'name' => 'Jaipur',
                'state' => 'Rajasthan',
                'description' => 'Discover the Pink City with its magnificent palaces, forts, and rich cultural heritage. Experience royal hospitality and traditional Rajasthani culture.',
                'image' => 'https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=800&h=600&fit=crop',
            ],
            [
                'id' => 4,
                'name' => 'Kerala',
                'state' => 'Kerala',
                'description' => 'Explore God\'s Own Country with its backwaters, lush greenery, and tranquil beaches. Experience Ayurveda and authentic South Indian cuisine.',
                'image' => 'https://images.unsplash.com/photo-1580619305218-8423a22a5593?w=800&h=600&fit=crop',
            ],
            [
                'id' => 5,
                'name' => 'Kashmir',
                'state' => 'Jammu & Kashmir',
                'description' => 'Visit the paradise on earth with stunning valleys, pristine lakes, and snow-covered mountains. Experience the beauty of Dal Lake and Gulmarg.',
                'image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            ],
        ];
    }

    /**
     * Get featured international packages (for home page)
     *
     * @param int $limit
     * @return array
     */
    public static function getFeaturedInternational(int $limit = 4): array
    {
        $packages = self::getInternationalPackages();
        return array_slice($packages, 0, $limit);
    }

    /**
     * Get featured domestic packages (for home page)
     *
     * @param int $limit
     * @return array
     */
    public static function getFeaturedDomestic(int $limit = 4): array
    {
        $packages = self::getDomesticPackages();
        return array_slice($packages, 0, $limit);
    }
}

