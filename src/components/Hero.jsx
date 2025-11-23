import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
                <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}></p>
                <Link to="/shop" className="btn btn-primary hero-btn">
                    {t('hero.cta')}
                </Link>
            </div>
        </section>
    );
};

export default Hero;
