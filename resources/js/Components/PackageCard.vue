<template>
    <div class="package-card">
        <Link :href="detailUrl" class="package-card-link">
            <img :src="packageData.image" :alt="packageData.name" class="package-card-image" />
            <div class="package-card-content">
                <h3 class="package-card-title">{{ packageData.name }}</h3>
                <p class="package-card-description">{{ packageData.description }}</p>
            </div>
        </Link>
        <a :href="whatsappUrl" target="_blank" class="package-card-button" @click.stop>
            Inquiry Now
        </a>
    </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    components: {
        Link,
    },
    props: {
        package: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: null,
        },
    },
    computed: {
        packageData() {
            return this.package;
        },
        packageType() {
            if (this.type) {
                return this.type;
            }
            // Try to determine from package data
            if (this.packageData.country && this.packageData.country !== 'Multiple Countries') {
                return 'international';
            }
            if (this.packageData.state) {
                return 'domestic';
            }
            return 'international'; // default
        },
        detailUrl() {
            return `/package/${this.packageType}/${this.packageData.id}`;
        },
        whatsappUrl() {
            const phone = '1234567890'; // Placeholder number
            const message = encodeURIComponent(`Hi, I'm interested in ${this.packageData.name} package.`);
            return `https://wa.me/${phone}?text=${message}`;
        },
    },
};
</script>

