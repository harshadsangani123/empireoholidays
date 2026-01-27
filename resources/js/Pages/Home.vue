<template>
    <div>
        <Header />
        
        <main class="main-content">
            <!-- Search Bar Section -->
            <section class="search-section">
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
            </section>
            
            <!-- Holiday Banner Sections -->
            <section class="holiday-banners">
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
            </section>
            
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
                        />
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <Link href="/international" class="btn btn-primary">View More International Packages</Link>
                    </div>
                </div>
            </section>
            
            <!-- Top Domestic Packages Section -->
            <section class="packages-section" style="background-color: #F7F7F7;">
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
                        />
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <Link href="/domestic" class="btn btn-primary">View More Domestic Packages</Link>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Link } from '@inertiajs/vue3';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';
import PackageCard from '../Components/PackageCard.vue';

defineProps({
    featuredInternational: {
        type: Array,
        default: () => [],
    },
    featuredDomestic: {
        type: Array,
        default: () => [],
    },
});
</script>

