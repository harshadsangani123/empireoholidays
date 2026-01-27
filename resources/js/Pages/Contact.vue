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
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        class="form-input" 
                                        v-model="form.name"
                                        required
                                        placeholder="Your full name"
                                    />
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-input" 
                                        v-model="form.email"
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input 
                                        type="tel" 
                                        class="form-input" 
                                        v-model="form.phone"
                                        required
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Message</label>
                                    <textarea 
                                        class="form-textarea" 
                                        v-model="form.message"
                                        required
                                        placeholder="Tell us about your travel plans..."
                                    ></textarea>
                                </div>
                                
                                <button type="submit" class="form-submit">Send Message</button>
                            </form>
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

<script setup>
import { ref, computed } from 'vue';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';

const form = ref({
    name: '',
    email: '',
    phone: '',
    message: '',
});

const whatsappUrl = computed(() => {
    const phone = '1234567890'; // Placeholder number
    const message = encodeURIComponent('Hi, I have a travel inquiry.');
    return `https://wa.me/${phone}?text=${message}`;
});

const handleSubmit = () => {
    // Simple alert for now - can be integrated with backend later
    alert('Thank you for your message! We will get back to you soon.');
    form.value = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };
};
</script>

