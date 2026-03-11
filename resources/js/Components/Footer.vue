<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <!-- Quick Links Section -->
                <div class="footer-section">
                    <h3>Quick Links</h3>
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
                
                <!-- Logo Section -->
                <div class="footer-section footer-logo-section">
                    <img :src="footerLogo" alt="Empireo Holidays" class="footer-logo">
                </div>
                
                <!-- Tour Types Section -->
                <div class="footer-section">
                    <h3>Tour Types</h3>
                    <div class="footer-links">
                        <span class="footer-link">Couple Tour</span>
                        <span class="footer-link">Customize Tour</span>
                        <span class="footer-link">Family Tour</span>
                        <span class="footer-link">Summer Tour</span>
                    </div>
                </div>
                
                <!-- Contact Us Section -->
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <div class="footer-contact-item" v-if="footerContact.phone">
                        <span>📞</span>
                        <a :href="`tel:${footerContact.phone}`">{{ footerContact.phone }}</a>
                    </div>
                    <div class="footer-contact-item" v-if="footerContact.email">
                        <span>✉️</span>
                        <a :href="`mailto:${footerContact.email}`">{{ footerContact.email }}</a>
                    </div>
                    <div class="footer-contact-item" v-if="footerContact.whatsapp">
                        <span>💬</span>
                        <a :href="whatsappUrl" target="_blank">WhatsApp Us</a>
                    </div>

                    <!-- Social Icons -->
                    <div class="footer-social">
                        <p class="footer-social-title">Follow Us</p>
                        <div class="footer-social-icons">
                            <a
                                v-if="socialLinks.facebook"
                                :href="socialLinks.facebook"
                                class="footer-social-icon footer-social-icon--facebook"
                                target="_blank"
                                rel="noopener"
                                aria-label="Follow us on Facebook"
                            >
                                <span>f</span>
                            </a>
                            <a
                                v-if="socialLinks.instagram"
                                :href="socialLinks.instagram"
                                class="footer-social-icon footer-social-icon--instagram"
                                target="_blank"
                                rel="noopener"
                                aria-label="Follow us on Instagram"
                            >
                                <img :src="instagramIcon" alt="Instagram" class="footer-social-image" />
                            </a>
                            <a
                                v-if="socialLinks.linkedin"
                                :href="socialLinks.linkedin"
                                class="footer-social-icon footer-social-icon--linkedin"
                                target="_blank"
                                rel="noopener"
                                aria-label="Follow us on LinkedIn"
                            >
                                <span>in</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <p style="margin: 0;">© 2026 EmpireoHolidays. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { Link, usePage } from '@inertiajs/vue3';
import instagramIcon from '../../images/icon-instagram.svg';
import footerLogo from '../../images/EMPIREO LOGO PNG (1).png';

export default {
    components: {
        Link,
    },
    data() {
        return {
            instagramIcon,
            footerLogo,
        };
    },
    computed: {
        footerContact() {
            const page = usePage();
            return page.props.footerContact || {
                phone: '+9016393892',
                email: 'empireoholidays@gmail.com',
                whatsapp: '1234567890',
                business_hours: 'Monday - Sunday: 9:00 AM - 7:00 PM',
                address: '',
            };
        },
        whatsappUrl() {
            const phone = this.footerContact.whatsapp || '1234567890';
            const message = encodeURIComponent("Hi, I'm interested in your travel packages.");
            return `https://wa.me/${phone}?text=${message}`;
        },
        socialLinks() {
            const defaults = {
                facebook: 'https://www.facebook.com/',
                instagram: 'https://www.instagram.com/',
                linkedin: 'https://www.linkedin.com/',
            };

            const social = (this.footerContact && this.footerContact.social) || {};

            return {
                facebook: social.facebook || defaults.facebook,
                instagram: social.instagram || defaults.instagram,
                linkedin: social.linkedin || defaults.linkedin,
            };
        },
    },
};
</script>

