<template>
    <div class="package-card">
        <Link :href="detailUrl" class="package-card-link">
            <img :src="packageData.image" :alt="packageData.name" class="package-card-image" />
            <div class="package-card-content">
                <h3 class="package-card-title">{{ packageData.name }}</h3>
                <p class="package-card-description">{{ packageData.description }}</p>
                <!-- Price display commented out - not showing to users currently -->
                <!-- <div v-if="packageData.price_per_person" class="package-card-price">
                    <span class="price-label">Starting from</span>
                    <span class="price-amount">{{ formatPrice(packageData.price_per_person, packageData.currency) }}</span>
                    <span class="price-unit">per person</span>
                </div> -->
                <!-- Duration display commented out - not showing to users currently -->
                <!-- <div v-if="packageData.duration" class="package-card-duration">
                    <span>{{ packageData.duration }}</span>
                </div> -->
            </div>
        </Link>
        <Link :href="inquiryUrl" class="package-card-button" @click.stop>
            Inquiry Now
        </Link>
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
        inquiryUrl() {
            return `/package/${this.packageType}/${this.packageData.id}/inquiry`;
        },
    },
    methods: {
        formatPrice(price, currency = 'INR') {
            if (!price) return '';
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            return formatter.format(price);
        },
    },
};
</script>

