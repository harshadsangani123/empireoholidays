<template>
    <div>
        <Header />
        
        <main class="main-content">
            <div class="page-header">
                <div class="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with us for your travel inquiries</p>
                </div>
            </div>
            
            <section class="contact-section">
                <div class="container">
                    <div class="contact-content">
                        <!-- Contact Form -->
                        <div class="contact-form">
                            <h2 style="margin-bottom: 24px;">Send us a Message</h2>
                            <form v-if="!success" @submit.prevent="handleSubmit">
                                <div v-if="errors.message" class="error-message">
                                    {{ errors.message }}
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        class="form-input"
                                        :class="{ error: errors.name }"
                                        v-model="form.name"
                                        required
                                        placeholder="Your full name"
                                    />
                                    <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-input"
                                        :class="{ error: errors.email }"
                                        v-model="form.email"
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input 
                                        type="tel" 
                                        class="form-input"
                                        :class="{ error: errors.phone }"
                                        v-model="form.phone"
                                        required
                                        placeholder="+1 234 567 890"
                                    />
                                    <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Message</label>
                                    <textarea 
                                        class="form-textarea"
                                        :class="{ error: errors.message }"
                                        v-model="form.message"
                                        required
                                        placeholder="Tell us about your travel plans..."
                                    ></textarea>
                                    <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
                                </div>
                                
                                <button type="submit" class="form-submit" :disabled="submitting">
                                    <span v-if="submitting">Sending...</span>
                                    <span v-else>Send Message</span>
                                </button>
                            </form>

                            <div v-if="success" class="success-message">
                                <h3>Thank you!</h3>
                                <p>Your message has been sent successfully. We will get back to you soon.</p>
                            </div>
                        </div>
                        
                        <!-- Contact Information -->
                        <div class="contact-info">
                            <h2 style="margin-bottom: 24px;">Get in Touch</h2>
                            
                            <div class="contact-info-item">
                                <div class="contact-info-icon">📞</div>
                                <div class="contact-info-content">
                                    <h3>Phone</h3>
                                    <a href="tel:+1234567890">+1 234 567 890</a>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-info-icon">✉️</div>
                                <div class="contact-info-content">
                                    <h3>Email</h3>
                                    <a href="mailto:info@empireoholidays.com">info@empireoholidays.com</a>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-info-icon">💬</div>
                                <div class="contact-info-content">
                                    <h3>WhatsApp</h3>
                                    <a :href="whatsappUrl" target="_blank">Chat with us on WhatsApp</a>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-info-icon">🕒</div>
                                <div class="contact-info-content">
                                    <h3>Business Hours</h3>
                                    <p>Monday - Saturday: 9:00 AM - 7:00 PM<br>Sunday: 10:00 AM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Map Placeholder -->
                    <div class="map-placeholder">
                        <p>📍 Google Maps will be integrated here</p>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script>
import { router } from '@inertiajs/vue3';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                message: '',
            },
            errors: {},
            submitting: false,
            success: false,
        };
    },
    computed: {
        whatsappUrl() {
            const phone = '1234567890'; // Placeholder number
            const message = encodeURIComponent('Hi, I have a travel inquiry.');
            return `https://wa.me/${phone}?text=${message}`;
        },
    },
    methods: {
        handleSubmit() {
            this.errors = {};
            this.submitting = true;

            router.post('/contact', this.form, {
                preserveScroll: true,
                onSuccess: () => {
                    this.success = true;
                    this.submitting = false;
                    this.errors = {};
                    this.form = {
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                    };
                },
                onError: (errors) => {
                    this.errors = errors;
                    this.submitting = false;
                    this.success = false;
                },
            });
        },
    },
};
</script>

