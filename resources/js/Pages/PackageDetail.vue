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
                            
                            <!-- Inquiry Button -->
                            <div class="inquiry-section">
                                <a :href="whatsappUrl" target="_blank" class="btn btn-primary btn-large">
                                    Inquiry Now
                                </a>
                                <p class="inquiry-note">Click to contact us on WhatsApp for more details and booking</p>
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
        whatsappUrl() {
            const phone = '1234567890'; // Placeholder number
            const message = encodeURIComponent(`Hi, I'm interested in ${this.package.name} package. Please provide more details.`);
            return `https://wa.me/${phone}?text=${message}`;
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
    },
};
</script>

