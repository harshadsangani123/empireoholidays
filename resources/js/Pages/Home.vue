<template>
    <div>
        <Header />
        
        <main class="main-content">
            <!-- Image Slider Hero Section -->
            <section class="video-hero slider-hero">
                <div class="slider-container">
                    <div 
                        v-for="(image, index) in heroSliderImages" 
                        :key="index"
                        class="slider-image"
                        :class="{ active: currentSlide === index }"
                        :style="{ backgroundImage: `url(${image})` }"
                    ></div>
                </div>
                <div class="video-overlay"></div>
                <div class="video-hero-content">
                    <div class="container">
                        <h1 class="video-hero-title">For those who do<br />everything beautifully</h1>
                        <p class="video-hero-subtitle">EmpireoHolidays - Your premier platform for<br />wellness, fitness, and creative travel experiences</p>
                        <div class="video-hero-buttons">
                            <Link href="/international" class="btn-hero btn-hero-primary">
                                Explore International
                            </Link>
                            <Link href="/domestic" class="btn-hero btn-hero-secondary">
                                Explore Domestic
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Search Bar Section -->
           <!-- <section class="search-section">
                <div class="container">
                    <div class="search-bar">
                        <div class="search-item">
                            <label class="search-label">Destination</label>
                            <input type="text" class="search-input" placeholder="Where are you going?" />
                        </div>
                        <div class="search-item">
                            <label class="search-label">Check in – Check out</label>
                            <input type="text" class="search-input" placeholder="Add dates" />
                        </div>
                        <div class="search-item">
                            <label class="search-label">Travelers</label>
                            <input type="text" class="search-input" placeholder="Add guests" />
                        </div>
                        <button class="search-button">Search</button>
                    </div>
                </div>
            </section> -->
            <!-- Holiday Banner Sections -->
            
            <!-- <section class="holiday-banners">
                <div class="banner-container">
                    <Link href="/international" class="holiday-banner international-banner">
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            <h2>Explore International Holidays</h2>
                            <p>Discover the world with our amazing packages</p>
                        </div>
                    </Link>
                    <Link href="/domestic" class="holiday-banner domestic-banner">
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            <h2>Discover Domestic Holidays</h2>
                            <p>Experience the best of India with our top deals</p>
                        </div>
                    </Link>
                </div>
            </section> -->
            <!-- Popular International Packages Section -->
            <section class="packages-section">
                <div class="container">
                    <div class="section-title">
                        <h2>Popular International Packages</h2>
                        <p>Unforgettable trips around the world</p>
                    </div>
                    <div class="grid grid-3">
                        <PackageCard 
                            v-for="pkg in featuredInternational.slice(0, 3)" 
                            :key="pkg.id"
                            :package="pkg"
                            type="international"
                        />
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <Link href="/international" class="btn btn-primary">View More International Packages</Link>
                    </div>
                </div>
            </section>
            
            <!-- Top Domestic Packages Section -->
            <section class="packages-section">
                <div class="container">
                    <div class="section-title">
                        <h2>Top Domestic Packages</h2>
                        <p>Explore the beauty of India</p>
                    </div>
                    <div class="grid grid-4">
                        <PackageCard 
                            v-for="pkg in featuredDomestic.slice(0, 4)" 
                            :key="pkg.id"
                            :package="pkg"
                            type="domestic"
                        />
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <Link href="/domestic" class="btn btn-primary">View More Domestic Packages</Link>
                    </div>
                </div>
            </section>

            <!-- Why Choose Us Section -->
            <section class="why-choose-section">
                <div class="container">
                    <div class="section-title">
                        <h2>Why Choose Empireo Holidays</h2>
                        <p>We make your travel simple, memorable, and worry‑free</p>
                    </div>
                    <div class="why-choose-grid">
                        <div class="why-card">
                            <div class="why-icon">👤</div>
                            <h3>Personalised Travel Experiences</h3>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">⚙️</div>
                            <h3>Comprehensive Services</h3>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🎯</div>
                            <h3>Expert Guidance</h3>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🌍</div>
                            <h3>Global & Domestic Reach</h3>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">💰</div>
                            <h3>Competitive Pricing</h3>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">📞</div>
                            <h3>24/7 Support</h3>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Booking Cards Section -->
            <section class="service-types-section">
                <div class="container">
                    <div class="section-title">
                        <h2>Everything You Need for Your Trip</h2>
                        <p>Fast, easy, and hassle‑free booking awaits</p>
                    </div>
                    <div class="service-types-grid">
                        <div class="service-card">
                            <div class="service-icon">✈️</div>
                            <h3>Flight tickets</h3>
                            <p>Book domestic and international flights in just a few clicks.</p>
                            <Link href="/contact" class="service-book-btn">
                                Book Now
                            </Link>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🚆</div>
                            <h3>Train Ticket</h3>
                            <p>Reserve train seats quickly with our hassle‑free support.</p>
                            <Link href="/contact" class="service-book-btn">
                                Book Now
                            </Link>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🚖</div>
                            <h3>Transportation</h3>
                            <p>Arrange airport transfers, cabs, and local sightseeing travel.</p>
                            <Link href="/contact" class="service-book-btn">
                                Book Now
                            </Link>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🏨</div>
                            <h3>Hotel booking</h3>
                            <p>Find and book comfortable stays at the best available rates.</p>
                            <Link href="/contact" class="service-book-btn">
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';
import PackageCard from '../Components/PackageCard.vue';
import heroLogo from '../../images/empireo-logo.jpg';

export default {
    components: {
        Header,
        Footer,
        PackageCard,
        Link,
    },
    props: {
        featuredInternational: {
            type: Array,
            default: () => [],
        },
        featuredDomestic: {
            type: Array,
            default: () => [],
        },
        heroBackgrounds: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentSlide: 0,
            sliderImages: [
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=1080&fit=crop',
                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop',
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop',
                'https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=1920&h=1080&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
            ],
            autoPlayInterval: null,
            heroLogo,
        };
    },
    computed: {
        heroSliderImages() {
            if (this.heroBackgrounds && this.heroBackgrounds.length) {
                return this.heroBackgrounds;
            }
            return this.sliderImages;
        },
    },
    mounted() {
        this.startAutoPlay();
    },
    beforeUnmount() {
        this.stopAutoPlay();
    },
    methods: {
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Change slide every 5 seconds
        },
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.sliderImages.length) % this.sliderImages.length;
        },
        goToSlide(index) {
            this.currentSlide = index;
        },
    },
};
</script>

