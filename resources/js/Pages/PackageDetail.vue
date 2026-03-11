<template>
    <div>
        <Header />
        
        <main class="main-content">
            <!-- Package Hero Image -->
            <section class="package-hero">
                <img :src="package.photos[0]" :alt="package.name" class="hero-image" />
                <div class="hero-overlay">
                    <div class="container">
                        <h1 class="package-title">{{ package.name }}</h1>
                        <p class="package-location" v-if="package.country">{{ package.country }}</p>
                        <p class="package-location" v-if="package.state">{{ package.state }}, India</p>
                    </div>
                </div>
            </section>
            
            <!-- Package Details Section -->
            <section class="package-details-section">
                <div class="container">
                    <div class="package-details-content">
                        <!-- Photo Gallery -->
                        <div class="photo-gallery">
                            <h2>Photo Gallery</h2>
                            <div class="gallery-grid">
                                <img 
                                    v-for="(photo, index) in package.photos" 
                                    :key="index"
                                    :src="photo" 
                                    :alt="`${package.name} - Photo ${index + 1}`"
                                    class="gallery-image"
                                    @click="openLightbox(index)"
                                />
                            </div>
                        </div>
                        
                        <!-- Package Description -->
                        <div class="package-description">
                            <h2>About {{ package.name }}</h2>
                            <p class="description-text">{{ package.detailedDescription || package.description }}</p>
                            
                            <!-- Package Info - Price and Duration commented out - not showing to users currently -->
                            <!-- <div v-if="package.price_per_person || package.duration" class="package-info">
                                <div v-if="package.price_per_person" class="info-item">
                                    <h3>Price</h3>
                                    <p class="price-display">
                                        <span class="price-amount">{{ formatPrice(package.price_per_person, package.currency) }}</span>
                                        <span class="price-unit">per person</span>
                                    </p>
                                </div>
                                <div v-if="package.duration" class="info-item">
                                    <h3>Duration</h3>
                                    <p>{{ package.duration }}</p>
                                </div>
                            </div> -->
                            
                            <!-- Inclusions -->
                            <div v-if="package.inclusions && package.inclusions.length > 0" class="package-section">
                                <h3>Inclusions</h3>
                                <ul class="package-list">
                                    <li v-for="(inclusion, index) in package.inclusions" :key="index">
                                        {{ inclusion.item || inclusion }}
                                    </li>
                                </ul>
                            </div>
                            
                            <!-- Exclusions -->
                            <div v-if="package.exclusions && package.exclusions.length > 0" class="package-section">
                                <h3>Exclusions</h3>
                                <ul class="package-list">
                                    <li v-for="(exclusion, index) in package.exclusions" :key="index">
                                        {{ exclusion.item || exclusion }}
                                    </li>
                                </ul>
                            </div>
                            
                            <!-- Itinerary -->
                            <div v-if="package.itinerary && package.itinerary.length > 0" class="package-section">
                                <h3>Itinerary</h3>
                                <div class="itinerary-list">
                                    <div v-for="(day, index) in package.itinerary" :key="index" class="itinerary-item">
                                        <div class="itinerary-day">
                                            <strong>{{ day.day || `Day ${index + 1}` }}</strong>
                                            <span v-if="day.title"> - {{ day.title }}</span>
                                        </div>
                                        <p v-if="day.description" class="itinerary-description">{{ day.description }}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Inquiry Button -->
                            <div class="inquiry-section">
                                <Link :href="inquiryUrl" class="btn btn-primary btn-large">
                                    Inquiry Now
                                </Link>
                                <p class="inquiry-note">Fill out the inquiry form and we'll get back to you soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Related Packages Section -->
            <section class="related-packages-section" style="background-color: #F7F7F7; padding: 60px 0;">
                <div class="container">
                    <div class="section-title">
                        <h2>Explore More Packages</h2>
                        <p>Discover other amazing destinations</p>
                    </div>
                    <div style="text-align: center; margin-top: 32px;">
                        <Link v-if="package.type === 'international'" href="/international" class="btn btn-primary">
                            View All International Packages
                        </Link>
                        <Link v-else href="/domestic" class="btn btn-primary">
                            View All Domestic Packages
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
        
        <!-- Lightbox Modal -->
        <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
            <button class="lightbox-close" @click="closeLightbox">&times;</button>
            <img :src="package.photos[currentPhotoIndex]" :alt="`${package.name} - Photo ${currentPhotoIndex + 1}`" class="lightbox-image" />
            <button v-if="currentPhotoIndex > 0" class="lightbox-prev" @click.stop="prevPhoto">‹</button>
            <button v-if="currentPhotoIndex < package.photos.length - 1" class="lightbox-next" @click.stop="nextPhoto">›</button>
        </div>
    </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';

export default {
    components: {
        Link,
        Header,
        Footer,
    },
    props: {
        package: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            lightboxOpen: false,
            currentPhotoIndex: 0,
        };
    },
    computed: {
        inquiryUrl() {
            return `/package/${this.package.type}/${this.package.id}/inquiry`;
        },
    },
    methods: {
        openLightbox(index) {
            this.currentPhotoIndex = index;
            this.lightboxOpen = true;
            document.body.style.overflow = 'hidden';
        },
        closeLightbox() {
            this.lightboxOpen = false;
            document.body.style.overflow = '';
        },
        nextPhoto() {
            if (this.currentPhotoIndex < this.package.photos.length - 1) {
                this.currentPhotoIndex++;
            }
        },
        prevPhoto() {
            if (this.currentPhotoIndex > 0) {
                this.currentPhotoIndex--;
            }
        },
        formatPrice(price, currency = 'INR') {
            if (!price) return '';
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            return formatter.format(price);
        },
    },
};
</script>

