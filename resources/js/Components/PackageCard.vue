<template>
    <div class="package-card">
        <img :src="packageData.image" :alt="packageData.name" class="package-card-image" />
        <div class="package-card-content">
            <h3 class="package-card-title">{{ packageData.name }}</h3>
            <p class="package-card-description">{{ packageData.description }}</p>
            <a :href="whatsappUrl" target="_blank" class="package-card-button">
                Inquiry Now
            </a>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    package: {
        type: Object,
        required: true,
    },
});

const packageData = computed(() => props.package);

const whatsappUrl = computed(() => {
    const phone = '1234567890'; // Placeholder number
    const message = encodeURIComponent(`Hi, I'm interested in ${packageData.value.name} package.`);
    return `https://wa.me/${phone}?text=${message}`;
});
</script>

