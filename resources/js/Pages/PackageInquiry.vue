<template>
    <div>
        <Header />
        
        <main class="main-content">
            <!-- Package Info Header -->
            <section class="package-hero" style="min-height: 200px;">
                <div class="hero-overlay">
                    <div class="container">
                        <h1 class="package-title">Inquiry for {{ package.name }}</h1>
                        <p class="package-location" v-if="package.country">{{ package.country }}</p>
                        <p class="package-location" v-if="package.state">{{ package.state }}, India</p>
                    </div>
                </div>
            </section>
            
            <!-- Inquiry Form Section -->
            <section class="package-details-section">
                <div class="container">
                    <div class="package-details-content">
                        <div class="inquiry-form-container">
                            <h2>Send Your Inquiry</h2>
                            <p class="form-intro">Fill out the form below and we'll get back to you as soon as possible.</p>
                            
                            <form v-if="!success" @submit.prevent="handleSubmit" class="inquiry-form">
                                <div v-if="errors.message" class="error-message">
                                    {{ errors.message }}
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">Full Name <span class="required">*</span></label>
                                        <input 
                                            type="text" 
                                            class="form-input" 
                                            :class="{ 'error': errors.name }"
                                            v-model="form.name"
                                            required
                                            placeholder="Enter your full name"
                                        />
                                        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Email Address <span class="required">*</span></label>
                                        <input 
                                            type="email" 
                                            class="form-input" 
                                            :class="{ 'error': errors.email }"
                                            v-model="form.email"
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">Phone Number <span class="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            class="form-input" 
                                            :class="{ 'error': errors.phone }"
                                            v-model="form.phone"
                                            required
                                            placeholder="+1 234 567 890"
                                        />
                                        <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Travel Date</label>
                                        <input 
                                            type="date" 
                                            class="form-input" 
                                            v-model="form.travel_date"
                                            :min="minDate"
                                        />
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">Number of Travelers</label>
                                        <input 
                                            type="number" 
                                            class="form-input" 
                                            v-model="form.number_of_travelers"
                                            min="1"
                                            placeholder="e.g., 2"
                                        />
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Package</label>
                                        <input 
                                            type="text" 
                                            class="form-input" 
                                            :value="package.name"
                                            disabled
                                        />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Message / Additional Details <span class="required">*</span></label>
                                    <textarea 
                                        class="form-textarea" 
                                        :class="{ 'error': errors.message_text }"
                                        v-model="form.message_text"
                                        required
                                        rows="5"
                                        placeholder="Tell us about your travel plans, special requirements, or any questions you have..."
                                    ></textarea>
                                    <span v-if="errors.message_text" class="error-text">{{ errors.message_text }}</span>
                                </div>
                                
                                <input type="hidden" v-model="form.package_id" />
                                <input type="hidden" v-model="form.package_name" />
                                <input type="hidden" v-model="form.package_type" />
                                
                                <div class="form-actions">
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary btn-large"
                                        :disabled="submitting"
                                    >
                                        <span v-if="submitting">Sending...</span>
                                        <span v-else>Send Inquiry</span>
                                    </button>
                                    <Link :href="backUrl" class="btn btn-secondary">Cancel</Link>
                                </div>
                            </form>
                            
                            <div v-if="success" class="success-message">
                                <h3>Thank You!</h3>
                                <p>Your inquiry has been sent successfully. We'll get back to you soon.</p>
                                <Link :href="backUrl" class="btn btn-primary">Back to Package</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script>
import { Link, router } from '@inertiajs/vue3';
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';

export default {
    components: {
        Link,
        Header,
        Footer,
    },
    props: {
        package: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                travel_date: '',
                number_of_travelers: '',
                message_text: '',
                package_id: this.package.id,
                package_name: this.package.name,
                package_type: this.package.type,
            },
            errors: {},
            submitting: false,
            success: false,
        };
    },
    computed: {
        minDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        },
        backUrl() {
            return `/package/${this.package.type}/${this.package.id}`;
        },
    },
    methods: {
        handleSubmit() {
            this.errors = {};
            this.submitting = true;
            
            router.post('/inquiry', this.form, {
                preserveScroll: true,
                onSuccess: (page) => {
                    this.success = true;
                    this.submitting = false;
                    this.errors = {};
                    // Reset form
                    this.form = {
                        name: '',
                        email: '',
                        phone: '',
                        travel_date: '',
                        number_of_travelers: '',
                        message_text: '',
                        package_id: this.package.id,
                        package_name: this.package.name,
                        package_type: this.package.type,
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

<style scoped>
.inquiry-form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-intro {
    color: #666;
    margin-bottom: 30px;
}

.inquiry-form {
    margin-top: 30px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.required {
    color: #f53003;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #f53003;
}

.form-input.error,
.form-textarea.error {
    border-color: #f53003;
}

.form-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

.error-text {
    display: block;
    color: #f53003;
    font-size: 12px;
    margin-top: 4px;
}

.error-message {
    background-color: #fee;
    color: #c33;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 20px;
    border: 1px solid #fcc;
}

.success-message {
    text-align: center;
    padding: 40px;
    background-color: #f0f9ff;
    border-radius: 8px;
    border: 2px solid #0ea5e9;
}

.success-message h3 {
    color: #0ea5e9;
    margin-bottom: 10px;
}

.success-message p {
    color: #666;
    margin-bottom: 20px;
}

.form-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.form-actions .btn {
    flex: 1;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .inquiry-form-container {
        padding: 20px;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .form-actions {
        flex-direction: column;
    }
}
</style>

