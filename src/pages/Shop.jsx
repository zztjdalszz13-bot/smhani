import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import './Shop.css';

const Shop = () => {
    const { t, language } = useLanguage();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [activeCategory, setActiveCategory] = useState('all');

    // Helper to safely get translated string
    const getLocalized = (obj) => obj[language] || obj['ko'];

    useEffect(() => {
        // Since product categories are now objects, we need to filter based on the 'ko' value 
        // or map the URL param to the correct category key if we were doing strict matching.
        // For simplicity, let's assume the URL params 'hanyak', 'tea' map to specific Korean keywords 
        // or we check against the localized category.

        if (categoryParam) {
            setActiveCategory(categoryParam);
            setFilteredProducts(products.filter(p => {
                const categoryKo = p.category.ko;
                if (categoryParam === 'hanyak') return categoryKo === '보약' || categoryKo === '한약';
                if (categoryParam === 'tea') return categoryKo === '건강차';
                if (categoryParam === 'gift') return true;
                return true;
            }));
        } else {
            setActiveCategory('all');
            setFilteredProducts(products);
        }
    }, [categoryParam]);

    const handleCategoryChange = (categoryKey) => {
        setActiveCategory(categoryKey);
        if (categoryKey === 'all') {
            setFilteredProducts(products);
        } else {
            // Filter based on the category key mapping
            setFilteredProducts(products.filter(p => {
                const categoryKo = p.category.ko;
                if (categoryKey === 'hanyak') return categoryKo === '보약' || categoryKo === '한약';
                if (categoryKey === 'tea') return categoryKo === '건강차';
                if (categoryKey === 'juice') return categoryKo === '건강즙';
                if (categoryKey === 'snack') return categoryKo === '간식';
                return true;
            }));
        }
    };

    const categories = ['all', 'hanyak', 'tea', 'juice', 'snack'];

    return (
        <div className="shop-page container">
            <div className="shop-header text-center">
                <h2 className="section-title">{t('shop.title')}</h2>
                <p className="section-subtitle">{t('shop.subtitle')}</p>
            </div>

            <div className="category-filter">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {t(`shop.categories.${cat}`)}
                    </button>
                ))}
            </div>

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
