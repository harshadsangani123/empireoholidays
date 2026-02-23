<?php

namespace Database\Seeders;

use App\Data\Packages;
use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Detailed descriptions mapping
        $detailedDescriptions = [
            'international' => [
                1 => 'Thailand is a tropical paradise known for its stunning beaches, ancient temples, vibrant nightlife, and delicious cuisine. Explore the bustling streets of Bangkok, relax on the pristine beaches of Phuket, visit historic temples in Chiang Mai, and experience the unique culture. From luxury resorts to budget-friendly accommodations, Thailand offers something for every traveler.',
                2 => 'Dubai is a city of superlatives, where luxury meets innovation. Experience the world\'s tallest building, Burj Khalifa, shop at the Dubai Mall, and enjoy thrilling desert safaris. Relax on pristine beaches, visit the Palm Jumeirah, and explore traditional souks. From luxury resorts to adventure activities, Dubai offers a perfect blend of modern attractions and traditional Arabian culture.',
                3 => 'Bali, Indonesia\'s most famous island, is a tropical paradise with stunning beaches, ancient temples, lush rice terraces, and world-class resorts. Experience the unique Balinese culture, visit sacred temples like Uluwatu and Tanah Lot, relax on beautiful beaches, and enjoy traditional dance performances. Perfect for honeymooners, families, and adventure seekers alike.',
                4 => 'Vietnam offers a rich tapestry of history, culture, and natural beauty. Explore the bustling streets of Hanoi and Ho Chi Minh City, cruise through the stunning Halong Bay, visit ancient temples, and savor delicious Vietnamese cuisine. From the Mekong Delta to the mountains of Sapa, Vietnam provides diverse experiences for every traveler.',
                5 => 'Baku, the capital of Azerbaijan, is a fascinating blend of ancient and modern. Explore the historic Old City with its medieval walls, visit the modern Flame Towers, and enjoy the beautiful Caspian Sea coastline. Experience the unique culture, delicious cuisine, and warm hospitality of this emerging destination.',
                6 => 'Singapore is a vibrant city-state that seamlessly blends modern architecture with rich cultural heritage. Explore Gardens by the Bay, visit Sentosa Island, and enjoy the famous Singapore Zoo. Indulge in diverse cuisine from hawker centers to Michelin-starred restaurants. Shop on Orchard Road, experience the nightlife, and discover the city\'s multicultural neighborhoods.',
                7 => 'Malaysia offers diverse experiences from pristine beaches to lush rainforests, modern cities to traditional villages. Explore the vibrant capital Kuala Lumpur, relax on the beautiful beaches of Langkawi, visit the historic city of Malacca, and experience the rich cultural diversity. A perfect destination combining natural beauty with modern amenities.',
                8 => 'Embark on an unforgettable European journey visiting multiple countries and experiencing diverse cultures. From the romantic streets of Paris to the historic canals of Venice, from the vibrant nightlife of Barcelona to the classical beauty of Vienna. This comprehensive tour offers the best of Europe with carefully selected destinations, comfortable accommodations, and expert guides.',
                9 => 'Africa is a continent of incredible diversity, offering wildlife safaris, stunning landscapes, rich cultures, and unforgettable adventures. Experience the Big Five on safari in Kenya or Tanzania, explore the ancient pyramids of Egypt, visit the vibrant cities of South Africa, and discover the natural wonders of the continent.',
                10 => 'Set sail on an amazing cruise adventure exploring multiple destinations while enjoying world-class amenities. Experience fine dining, entertainment, spa treatments, and various activities on board. Visit beautiful ports, explore different cultures, and create unforgettable memories as you travel in luxury across the seas.',
            ],
            'domestic' => [
                1 => 'Kashmir, the Paradise on Earth, is renowned for its stunning natural beauty. Experience the breathtaking Dal Lake with its houseboats, visit the beautiful Mughal Gardens, and enjoy the snow-covered slopes of Gulmarg. Explore the historic city of Srinagar, take a shikara ride, and experience the warm hospitality of the Kashmiri people. A perfect destination for nature and adventure lovers.',
                2 => 'Leh Ladakh is a high-altitude desert region offering breathtaking landscapes, ancient monasteries, and unique culture. Visit the stunning Pangong Lake, explore ancient Buddhist monasteries, experience the unique Ladakhi culture, and enjoy adventure activities like trekking and river rafting. A paradise for adventure seekers and nature lovers.',
                3 => 'Himachal Pradesh is a beautiful hill state in the Himalayas offering stunning mountain views, adventure sports, and serene landscapes. Visit popular hill stations like Shimla, Manali, and Dharamshala, enjoy activities like paragliding and river rafting, and experience the warm hospitality of the mountain people.',
                4 => 'Sikkim and Darjeeling offer enchanting beauty with tea gardens, mountain views, Buddhist monasteries, and pristine natural landscapes. Visit the famous Darjeeling tea gardens, explore ancient monasteries in Sikkim, enjoy stunning views of Kanchenjunga, and experience the unique culture of the region.',
                5 => 'Uttarakhand, known as the Land of Gods, offers spiritual experiences, natural beauty, and adventure activities. Visit sacred temples like Badrinath and Kedarnath, explore hill stations like Mussoorie and Nainital, enjoy trekking and river rafting, and experience the serene beauty of the Himalayas.',
                6 => 'The 4 Dham Yatra is a sacred pilgrimage to four holy shrines: Yamunotri, Gangotri, Kedarnath, and Badrinath. This spiritual journey through the Himalayas offers not only religious significance but also stunning natural beauty, challenging treks, and a deep connection with nature and spirituality.',
                7 => 'Goa, India\'s party capital, offers a perfect blend of beautiful beaches, Portuguese heritage, and vibrant nightlife. Relax on pristine beaches like Calangute, Baga, and Anjuna. Explore historic churches and forts, enjoy water sports, and savor delicious seafood. From beach shacks to luxury resorts, Goa caters to every type of traveler seeking sun, sand, and fun.',
                8 => 'Karnataka is a diverse state offering ancient temples, hill stations, wildlife sanctuaries, and beautiful beaches. Visit the historic city of Mysore, explore the ruins of Hampi, enjoy the hill stations of Coorg and Chikmagalur, and relax on the beaches of Gokarna. Rich in history, culture, and natural beauty.',
                9 => 'Kerala, God\'s Own Country, is famous for its serene backwaters, lush greenery, and tranquil beaches. Experience a houseboat cruise through the backwaters, visit tea plantations in Munnar, and relax on beautiful beaches. Enjoy Ayurvedic treatments, explore wildlife sanctuaries, and savor authentic South Indian cuisine. Kerala offers a perfect escape for nature lovers.',
                10 => 'Andaman and Nicobar Islands are a tropical paradise with pristine beaches, crystal-clear waters, and rich marine life. Visit the historic Cellular Jail, enjoy water sports like scuba diving and snorkeling, relax on beautiful beaches like Radhanagar, and explore the unique culture and natural beauty of these islands.',
            ],
        ];

        // Photos mapping
        $photos = [
            'international' => [
                1 => [ // Thailand
                    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                ],
                2 => [ // Dubai
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
                ],
                3 => [ // Bali
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                ],
                4 => [ // Vietnam
                    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1508051869793-7c0c0c0b8b3c?w=1200&h=800&fit=crop',
                ],
                5 => [ // Baku
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                ],
                6 => [ // Singapore
                    'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                7 => [ // Malaysia
                    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                ],
                8 => [ // Europe
                    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1525625293386-3f9f5df7bf55?w=1200&h=800&fit=crop',
                ],
                9 => [ // Africa
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                ],
                10 => [ // Cruises
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
            ],
            'domestic' => [
                1 => [ // Kashmir
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                2 => [ // Leh Ladakh
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                3 => [ // Himachal Pradesh
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                4 => [ // Sikkim Darjeeling
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                5 => [ // Uttrakhand
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                6 => [ // 4 Dham Yatra
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                ],
                7 => [ // Goa
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                ],
                8 => [ // Karnataka
                    'https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1511739001646-5b0c763c4b1a?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1508051869793-7c0c0c0b8b3c?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
                ],
                9 => [ // Kerala
                    'https://images.unsplash.com/photo-1580619305218-8423a22a5593?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                ],
                10 => [ // Andaman Nicobar
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
                ],
            ],
        ];

        // Default prices (per person in INR) - can be updated later from admin
        $defaultPrices = [
            'international' => [
                1 => 45000, // Thailand
                2 => 95000, // Dubai
                3 => 55000, // Bali
                4 => 50000, // Vietnam
                5 => 65000, // Baku
                6 => 65000, // Singapore
                7 => 50000, // Malaysia
                8 => 150000, // Europe
                9 => 120000, // Africa
                10 => 80000, // Cruises
            ],
            'domestic' => [
                1 => 40000, // Kashmir
                2 => 35000, // Leh Ladakh
                3 => 30000, // Himachal Pradesh
                4 => 32000, // Sikkim Darjeeling
                5 => 28000, // Uttrakhand
                6 => 35000, // 4 Dham Yatra
                7 => 25000, // Goa
                8 => 22000, // Karnataka
                9 => 35000, // Kerala
                10 => 45000, // Andaman Nicobar
            ],
        ];

        // Migrate International Packages
        $internationalPackages = Packages::getInternationalPackages();
        foreach ($internationalPackages as $pkg) {
            $galleryImages = $photos['international'][$pkg['id']] ?? [];
            // Remove main image from gallery if it exists
            $galleryImages = array_filter($galleryImages, function($img) use ($pkg) {
                return $img !== $pkg['image'];
            });

            Package::create([
                'name' => $pkg['name'],
                'type' => 'international',
                'country' => $pkg['country'],
                'state' => null,
                'description' => $pkg['description'],
                'detailed_description' => $detailedDescriptions['international'][$pkg['id']] ?? $pkg['description'],
                'price_per_person' => $defaultPrices['international'][$pkg['id']] ?? 50000,
                'currency' => 'INR',
                'duration' => '5 Days / 4 Nights',
                'main_image' => $pkg['image'],
                'gallery_images' => array_values($galleryImages),
                'is_featured' => $pkg['id'] <= 4, // First 4 are featured
                'is_published' => true,
                'sort_order' => $pkg['id'],
            ]);
        }

        // Migrate Domestic Packages
        $domesticPackages = Packages::getDomesticPackages();
        foreach ($domesticPackages as $pkg) {
            $galleryImages = $photos['domestic'][$pkg['id']] ?? [];
            // Remove main image from gallery if it exists
            $galleryImages = array_filter($galleryImages, function($img) use ($pkg) {
                return $img !== $pkg['image'];
            });

            Package::create([
                'name' => $pkg['name'],
                'type' => 'domestic',
                'country' => null,
                'state' => $pkg['state'],
                'description' => $pkg['description'],
                'detailed_description' => $detailedDescriptions['domestic'][$pkg['id']] ?? $pkg['description'],
                'price_per_person' => $defaultPrices['domestic'][$pkg['id']] ?? 25000,
                'currency' => 'INR',
                'duration' => '4 Days / 3 Nights',
                'main_image' => $pkg['image'],
                'gallery_images' => array_values($galleryImages),
                'is_featured' => $pkg['id'] <= 4, // First 4 are featured
                'is_published' => true,
                'sort_order' => $pkg['id'],
            ]);
        }
    }
}

