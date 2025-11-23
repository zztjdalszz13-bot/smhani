import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">청본당</div>
                    <p className="footer-desc" dangerouslySetInnerHTML={{ __html: t('footer.desc') }}></p>
                </div>

                <div className="footer-links">
                    <div className="footer-section">
                        <h4>{t('footer.shop')}</h4>
                        <ul>
                            <li><Link to="/shop">{t('footer.allProducts')}</Link></li>
                            <li><Link to="/shop?category=hanyak">{t('footer.hanyak')}</Link></li>
                            <li><Link to="/shop?category=tea">{t('footer.tea')}</Link></li>
                            <li><Link to="/shop?category=gift">{t('footer.gift')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t('footer.cs')}</h4>
                        <ul>
                            <li><Link to="/notice">{t('footer.notice')}</Link></li>
                            <li><Link to="/faq">{t('footer.faq')}</Link></li>
                            <li><Link to="/contact">{t('footer.contact')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t('footer.company')}</h4>
                        <address>
                            {t('footer.address')}<br />
                            Tel: 02-1234-5678 | Email: help@cheongbondang.com
                        </address>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
