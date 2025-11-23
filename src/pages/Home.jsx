import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useViewMode } from '../contexts/ViewModeContext';
import SimpleProductList from '../components/SimpleProductList';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
    const { t, language } = useLanguage();
    const { viewMode } = useViewMode();
    const navigate = useNavigate();

    if (viewMode === 'simple') {
        return <SimpleProductList />;
    }

    // Featured products for the showcase
    const gongjindan = products.find(p => p.id === 2);
    const kyungokgo = products.find(p => p.id === 1);
    const ssanghwacha = products.find(p => p.id === 4);

    const getLocalized = (obj) => obj[language] || obj['ko'];

    return (
        <div className="home-container">
            {/* Section 1: Gongjindan (Hero-like) */}
            <section className="product-showcase section-gongjindan">
                <div className="showcase-content">
                    <h2 className="showcase-title">{t('home.slogans.gongjindan.title')}</h2>
                    <p className="showcase-subtitle">{t('home.slogans.gongjindan.subtitle')}</p>
                    <p className="showcase-desc" dangerouslySetInnerHTML={{ __html: t('home.slogans.gongjindan.desc') }} />
                    <div className="showcase-actions">
                        <Link to={`/product/${gongjindan.id}`} className="btn btn-primary btn-round">
                            {t('product.learnMore')}
                        </Link>
                        <Link to={`/product/${gongjindan.id}`} className="btn btn-outline btn-round">
                            {t('product.buyNow')}
                        </Link>
                    </div>
                </div>
                <div className="showcase-image-wrapper">
                    <img src={gongjindan.image} alt={getLocalized(gongjindan.name)} className="showcase-image" />
                </div>
            </section>

            {/* Section 2: Kyungokgo */}
            <section className="product-showcase section-kyungokgo">
                <div className="showcase-content">
                    <h2 className="showcase-title">{t('home.slogans.kyungokgo.title')}</h2>
                    <p className="showcase-subtitle">{t('home.slogans.kyungokgo.subtitle')}</p>
                    <p className="showcase-desc" dangerouslySetInnerHTML={{ __html: t('home.slogans.kyungokgo.desc') }} />
                    <div className="showcase-actions">
                        <Link to={`/product/${kyungokgo.id}`} className="btn btn-primary btn-round">
                            {t('product.learnMore')}
                        </Link>
                        <Link to={`/product/${kyungokgo.id}`} className="btn btn-outline btn-round">
                            {t('product.buyNow')}
                        </Link>
                    </div>
                </div>
                <div className="showcase-image-wrapper">
                    <img src={kyungokgo.image} alt={getLocalized(kyungokgo.name)} className="showcase-image" />
                </div>
            </section>

            {/* Section 3: Ssanghwacha */}
            <section className="product-showcase section-ssanghwacha">
                <div className="showcase-content">
                    <h2 className="showcase-title">{t('home.slogans.ssanghwacha.title')}</h2>
                    <p className="showcase-subtitle">{t('home.slogans.ssanghwacha.subtitle')}</p>
                    <p className="showcase-desc" dangerouslySetInnerHTML={{ __html: t('home.slogans.ssanghwacha.desc') }} />
                    <div className="showcase-actions">
                        <Link to={`/product/${ssanghwacha.id}`} className="btn btn-primary btn-round">
                            {t('product.learnMore')}
                        </Link>
                        <Link to={`/product/${ssanghwacha.id}`} className="btn btn-outline btn-round">
                            {t('product.buyNow')}
                        </Link>
                    </div>
                </div>
                <div className="showcase-image-wrapper">
                    <img src={ssanghwacha.image} alt={getLocalized(ssanghwacha.name)} className="showcase-image" />
                </div>
            </section>

            {/* Brand Story Link Section */}
            <section className="brand-story-section">
                <div className="brand-story-content">
                    <h2>{t('home.brandTitle')}</h2>
                    <p dangerouslySetInnerHTML={{ __html: t('home.brandDesc1') }} />
                    <Link to="/about" className="btn-text">
                        {t('nav.about')} &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
