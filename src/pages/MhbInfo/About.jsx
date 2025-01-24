import React from 'react';
import '../../assets/css/mhbStore/about.css';
import { FaBullseye, FaStar, FaHandshake, FaCheckCircle } from 'react-icons/fa';
const About = () => {
    return (
        <div className="about-container">
            {/* Banner Section */}
            <div className="banner">
                <h1 className="banner-title">About Us</h1>
            </div>

            {/* Introduction Section */}
            <div className="introduction-section">
                <h2>Welcome to <strong>MHB Store</strong></h2>
                <p>
                    Where you’re more than just a customer—you’re family. Our team is dedicated to providing the best, 
                    handpicked products that bring value, quality, and joy to your life. We believe in treating each of you as a member 
                    of our MHB family, and that philosophy drives every decision we make.
                </p>
            </div>

            {/* Mission, Values, Trust, Commitment Sections */}
            <div className="info-sections">
                <div className="info-card">
                    <FaBullseye className="info-icon" />
                    <h2>Our Mission</h2>
                    <p>
                        At MHB Store, our mission is simple: to ensure the health, wealth, and happiness of every member of our extended family. 
                        We carefully select products that enhance your daily life, support your well-being, and bring you lasting satisfaction.
                    </p>
                </div>
                <div className="info-card">
                    <FaStar className="info-icon" />
                    <h2>Why We’re Different</h2>
                    <p>
                        Our team approaches every product with one question in mind: Would we recommend this to our own family? By holding ourselves 
                        to this standard, we deliver items that reflect our commitment to your satisfaction and peace of mind.
                    </p>
                </div>
                <div className="info-card">
                    <FaHandshake className="info-icon" />
                    <h2>Our Promise to You</h2>
                    <p>
                        MHB Store is built on trust, value, and the genuine belief that everyone deserves the best. We’re here to make sure you feel supported, 
                        appreciated, and delighted with every purchase.
                    </p>
                </div>
                <div className="info-card">
                    <FaCheckCircle className="info-icon" />
                    <h2>Commitment</h2>
                    <p>
                        Your satisfaction is our priority, every step of the way. Our customer service is always available to assist you, because we see you as 
                        part of our family, and your happiness is our success.
                    </p>
                </div>
            </div>

            {/* Closing Section */}
            <div className="closing-section">
                <p>
                    Thank you for being a part of <strong>MHB Store</strong>. Together, let’s build a future full of health, wealth, and happiness.
                </p>
            </div>
        </div>
    );
};

export default About;
