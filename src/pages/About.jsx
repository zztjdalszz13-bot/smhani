import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-hero-content container">
                    <h1 className="about-title">{t('aboutPage.title')}</h1>
                    <p className="about-subtitle">{t('aboutPage.subtitle')}</p>
                </div>
            </div>

            <div className="about-content container">
                <div className="about-grid">
                    <div className="about-text-section">
                        <p className="about-text">{t('aboutPage.p1')}</p>
                        <p className="about-text">{t('aboutPage.p2')}</p>
                        <p className="about-text">{t('aboutPage.p3')}</p>
                        <p className="about-text highlight">{t('aboutPage.p4')}</p>
                    </div>
                    <div className="about-image-section">
                        <img
                            src="https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=800"
                            alt="Traditional Medicine"
                            className="about-image"
                        />
                        <div className="image-caption">
                            <span>Since 1985</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
