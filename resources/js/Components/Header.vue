<template>
    <header class="header">
        <div class="header-container">
            <Link href="/" class="logo">
                EmpireoHolidays
            </Link>
            
            <nav class="nav" :class="{ active: isMenuOpen }">
                <Link href="/" class="nav-link" @click="closeMenu">Home</Link>
                <Link href="/about" class="nav-link" @click="closeMenu">About Us</Link>
                <Link href="/international" class="nav-link" @click="closeMenu">International</Link>
                <Link href="/domestic" class="nav-link" @click="closeMenu">Domestic</Link>
                <Link href="/contact" class="nav-link" @click="closeMenu">Contact Us</Link>
            </nav>
            
            <div class="header-actions">
                <a :href="whatsappUrl" target="_blank" class="btn-inquiry">
                    Inquiry Now
                </a>
                <button class="menu-toggle" :class="{ active: isMenuOpen }" @click="toggleMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const whatsappUrl = computed(() => {
    const phone = '1234567890'; // Placeholder number
    const message = encodeURIComponent('Hi, I\'m interested in your travel packages.');
    return `https://wa.me/${phone}?text=${message}`;
});
</script>

