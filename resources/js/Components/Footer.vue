<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <!-- Home Section -->
                <div class="footer-section">
                    <h3>Home</h3>
                    <div class="footer-links">
                        <Link href="/" class="footer-link">Home</Link>
                        <Link href="/about" class="footer-link">About Us</Link>
                        <Link href="/international" class="footer-link">International</Link>
                        <Link href="/domestic" class="footer-link">Domestic</Link>
                        <Link href="/contact" class="footer-link">Contact Us</Link>
                    </div>
                </div>
                
                <!-- About Us Section -->
                <div class="footer-section">
                    <h3>About Us</h3>
                    <div class="footer-links">
                        <Link href="/international" class="footer-link">International Packages</Link>
                        <Link href="/domestic" class="footer-link">Domestic Packages</Link>
                    </div>
                </div>
                
                <!-- International Section -->
                <div class="footer-section">
                    <h3>International</h3>
                    <div class="footer-links">
                        <Link href="/domestic" class="footer-link">Domestic Packages</Link>
                    </div>
                </div>
                
                <!-- Domestic Section -->
                <div class="footer-section">
                    <h3>Domestic</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">FAQs</a>
                        <a href="#" class="footer-link">Travel Tips</a>
                        <a href="#" class="footer-link">Gallery</a>
                    </div>
                </div>
                
                <!-- Contact Us Section -->
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <div class="footer-contact-item">
                        <span>📞</span>
                        <a href="tel:+1234567890">+1 234 567 890</a>
                    </div>
                    <div class="footer-contact-item">
                        <span>✉️</span>
                        <a href="mailto:info@empireoholidays.com">info@empireoholidays.com</a>
                    </div>
                    <div class="footer-contact-item">
                        <span>💬</span>
                        <a :href="whatsappUrl" target="_blank">WhatsApp Us</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <p style="margin: 0;">© 2024 EmpireoHolidays. All rights reserved.</p>
                    <p style="margin: 0;">Powered by Laravel & Vue.js</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const whatsappUrl = computed(() => {
    const phone = '1234567890'; // Placeholder number
    const message = encodeURIComponent('Hi, I\'m interested in your travel packages.');
    return `https://wa.me/${phone}?text=${message}`;
});
</script>

