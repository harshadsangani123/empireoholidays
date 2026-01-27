<template>
    <div>
        <Header />
        
        <main class="main-content">
            <div class="page-header">
                <div class="container">
                    <h1>International Holiday Packages</h1>
                    <p>Explore amazing destinations around the world</p>
                </div>
            </div>
            
            <section class="packages-section">
                <div class="container">
                    <div class="grid grid-3">
                        <PackageCard 
                            v-for="pkg in packages" 
                            :key="pkg.id"
                            :package="pkg"
                        />
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';
import PackageCard from '../Components/PackageCard.vue';

defineProps({
    packages: {
        type: Array,
        default: () => [],
    },
});
</script>

