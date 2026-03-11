<template>
    <header class="header">
        <div class="header-container">
            <Link href="/" class="logo">
                <img :src="logo" alt="Empireo Holidays" class="logo-image">
            </Link>
            
            <nav class="nav" :class="{ active: isMenuOpen }">
                <Link href="/" class="nav-link" @click="closeMenu">Home</Link>
                <Link href="/about" class="nav-link" @click="closeMenu">About Us</Link>
                <Link href="/international" class="nav-link" @click="closeMenu">International</Link>
                <Link href="/domestic" class="nav-link" @click="closeMenu">Domestic</Link>
                <Link href="/contact" class="nav-link" @click="closeMenu">Contact Us</Link>
            </nav>
            
            <div class="header-actions">
                <Link href="/contact" class="btn-inquiry">
                    Inquiry Now
                </Link>
                <button class="menu-toggle" :class="{ active: isMenuOpen }" @click="toggleMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import logo from '../../images/EMPIREO LOGO JPG (1).jpg';

export default {
    components: {
        Link,
    },
    data() {
        return {
            isMenuOpen: false,
            logo,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
            this.isMenuOpen = false;
        },
    },
};
</script>

