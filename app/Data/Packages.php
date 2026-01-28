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

    /**
     * Get international package by ID
     *
     * @param int $id
     * @return array|null
     */
    public static function getInternationalPackageById(int $id): ?array
    {
        $packages = self::getInternationalPackages();
        foreach ($packages as $package) {
            if ($package['id'] === $id) {
                return self::enrichPackageData($package, 'international');
            }
        }
        return null;
    }

    /**
     * Get domestic package by ID
     *
     * @param int $id
     * @return array|null
     */
    public static function getDomesticPackageById(int $id): ?array
    {
        $packages = self::getDomesticPackages();
        foreach ($packages as $package) {
            if ($package['id'] === $id) {
                return self::enrichPackageData($package, 'domestic');
            }
        }
        return null;
    }

    /**
     * Enrich package data with additional details and photos
     *
     * @param array $package
     * @param string $type
     * @return array
     */
    private static function enrichPackageData(array $package, string $type): array
    {
        $enriched = $package;
        
        // Add detailed descriptions
        $detailedDescriptions = [
            'international' => [
                1 => 'Paris, the City of Light, is one of the most romantic and culturally rich destinations in the world. Explore iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Stroll along the Seine River, visit charming neighborhoods like Montmartre, and indulge in world-class French cuisine. From art galleries to fashion boutiques, Paris offers an unforgettable experience for every traveler.',
                2 => 'Dubai is a city of superlatives, where luxury meets innovation. Experience the world\'s tallest building, Burj Khalifa, shop at the Dubai Mall, and enjoy thrilling desert safaris. Relax on pristine beaches, visit the Palm Jumeirah, and explore traditional souks. From luxury resorts to adventure activities, Dubai offers a perfect blend of modern attractions and traditional Arabian culture.',
                3 => 'The Maldives is a tropical paradise with crystal-clear turquoise waters, pristine white-sand beaches, and luxurious overwater villas. Perfect for honeymooners and those seeking ultimate relaxation. Enjoy world-class diving, snorkeling, spa treatments, and romantic dinners on the beach. Each resort island offers a unique experience with unparalleled natural beauty and luxury amenities.',
                4 => 'Singapore is a vibrant city-state that seamlessly blends modern architecture with rich cultural heritage. Explore Gardens by the Bay, visit Sentosa Island, and enjoy the famous Singapore Zoo. Indulge in diverse cuisine from hawker centers to Michelin-starred restaurants. Shop on Orchard Road, experience the nightlife, and discover the city\'s multicultural neighborhoods.',
                5 => 'Embark on an unforgettable European journey visiting multiple countries and experiencing diverse cultures. From the romantic streets of Paris to the historic canals of Venice, from the vibrant nightlife of Barcelona to the classical beauty of Vienna. This comprehensive tour offers the best of Europe with carefully selected destinations, comfortable accommodations, and expert guides.',
            ],
            'domestic' => [
                1 => 'Goa, India\'s party capital, offers a perfect blend of beautiful beaches, Portuguese heritage, and vibrant nightlife. Relax on pristine beaches like Calangute, Baga, and Anjuna. Explore historic churches and forts, enjoy water sports, and savor delicious seafood. From beach shacks to luxury resorts, Goa caters to every type of traveler seeking sun, sand, and fun.',
                2 => 'Manali, nestled in the Himalayas, is a paradise for nature lovers and adventure enthusiasts. Enjoy breathtaking views of snow-capped mountains, visit ancient temples, and experience thrilling activities like paragliding, river rafting, and skiing. Explore nearby attractions like Solang Valley, Rohtang Pass, and Hadimba Temple. Perfect for both relaxation and adventure.',
                3 => 'Jaipur, the Pink City, is a treasure trove of royal heritage and architectural marvels. Visit magnificent forts like Amber Fort and Nahargarh Fort, explore the City Palace, and admire the Hawa Mahal. Experience traditional Rajasthani culture, shop for handicrafts, and enjoy authentic local cuisine. Jaipur offers a perfect blend of history, culture, and modern amenities.',
                4 => 'Kerala, God\'s Own Country, is famous for its serene backwaters, lush greenery, and tranquil beaches. Experience a houseboat cruise through the backwaters, visit tea plantations in Munnar, and relax on beautiful beaches. Enjoy Ayurvedic treatments, explore wildlife sanctuaries, and savor authentic South Indian cuisine. Kerala offers a perfect escape for nature lovers.',
                5 => 'Kashmir, the Paradise on Earth, is renowned for its stunning natural beauty. Experience the breathtaking Dal Lake with its houseboats, visit the beautiful Mughal Gardens, and enjoy the snow-covered slopes of Gulmarg. Explore the historic city of Srinagar, take a shikara ride, and experience the warm hospitality of the Kashmiri people. A perfect destination for nature and adventure lovers.',
            ],
        ];

        $enriched['detailedDescription'] = $detailedDescriptions[$type][$package['id']] ?? $package['description'];

        // Add photos array
        $photos = [
            'international' => [
                1 => [
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898736-4c1e12a6e084?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1508051869793-7c0c0c0b8b3c?w=1200&h=800&fit=crop',
                ],
                2 => [
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
                ],
                3 => [
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                ],
                4 => [
                    'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                5 => [
                    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=1200&h=800&fit=crop',
                ],
            ],
            'domestic' => [
                1 => [
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                ],
                2 => [
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                3 => [
                    'https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1508051869793-7c0c0c0b8b3c?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                ],
                4 => [
                    'https://images.unsplash.com/photo-1580619305218-8423a22a5593?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                ],
                5 => [
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
            ],
        ];

        $enriched['photos'] = $photos[$type][$package['id']] ?? [$package['image']];
        $enriched['type'] = $type;

        return $enriched;
    }
}

