<template>
    <div>
        <Header />
        
        <main class="main-content">
            <div class="page-header">
                <div class="container">
                    <h1>About EmpireoHolidays</h1>
                    <p>Your trusted travel partner for unforgettable experiences</p>
                </div>
            </div>
            
            <section class="about-section">
                <div class="container">
                    <div class="about-content">
                        <h2>Welcome to EmpireoHolidays</h2>
                        <p>
                            EmpireoHolidays is a leading travel company specializing in creating memorable holiday experiences 
                            for travelers across the globe. We are dedicated to providing exceptional service, competitive 
                            pricing, and personalized travel solutions that cater to your unique preferences.
                        </p>
                        <p>
                            Whether you're dreaming of exploring exotic international destinations or discovering the hidden 
                            gems of India, we have the perfect holiday package for you. Our team of travel experts works 
                            tirelessly to curate the best travel experiences that combine comfort, adventure, and cultural 
                            immersion.
                        </p>
                    </div>
                    
                    <div class="about-features">
                        <div class="about-feature">
                            <div class="about-feature-icon">✈️</div>
                            <h3>Domestic Holidays</h3>
                            <p>
                                Explore the diverse beauty of India with our carefully crafted domestic holiday packages. 
                                From the beaches of Goa to the mountains of Kashmir, discover the best of what India has to offer.
                            </p>
                        </div>
                        
                        <div class="about-feature">
                            <div class="about-feature-icon">🌍</div>
                            <h3>International Holidays</h3>
                            <p>
                                Embark on exciting international adventures with our range of international holiday packages. 
                                Experience different cultures, cuisines, and landscapes across the globe.
                            </p>
                        </div>
                        
                        <div class="about-feature">
                            <div class="about-feature-icon">⭐</div>
                            <h3>Personalized Experiences</h3>
                            <p>
                                We believe every traveler is unique. Our team provides personalized travel experiences tailored 
                                to your preferences, ensuring your holiday is exactly what you've always dreamed of.
                            </p>
                        </div>
                        
                        <div class="about-feature">
                            <div class="about-feature-icon">💰</div>
                            <h3>Best Pricing</h3>
                            <p>
                                Get the best value for your money with our competitive pricing. We work directly with hotels, 
                                airlines, and local partners to offer you the most affordable travel packages.
                            </p>
                        </div>
                        
                        <div class="about-feature">
                            <div class="about-feature-icon">🤝</div>
                            <h3>Trusted Travel Partner</h3>
                            <p>
                                With years of experience in the travel industry, we have built a reputation as a trusted and 
                                reliable travel partner. Your satisfaction and safety are our top priorities.
                            </p>
                        </div>
                        
                        <div class="about-feature">
                            <div class="about-feature-icon">🎯</div>
                            <h3>24/7 Support</h3>
                            <p>
                                Our dedicated support team is available round the clock to assist you before, during, and after 
                                your trip. We're here to make your travel experience seamless and worry-free.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
    </div>
</template>

<script>
import Header from '../Components/Header.vue';
import Footer from '../Components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
};
</script>

