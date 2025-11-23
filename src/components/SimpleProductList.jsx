import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthUpsellModal from './AuthUpsellModal';
import './SimpleProductList.css';

const SimpleProductList = () => {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [showUpsell, setShowUpsell] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getLocalized = (obj) => obj[language] || obj['ko'];

    const handleBuyNow = (product) => {
        if (!user) {
            setSelectedProduct(product);
            setShowUpsell(true);
        } else {
            addToCart(product);
            alert(t('cart.added'));
        }
    };

    const handleUpsellConfirm = () => {
        setShowUpsell(false);
        if (selectedProduct) {
            addToCart(selectedProduct);
            alert(t('cart.added'));
            setSelectedProduct(null);
        }
    };

    return (
        <div className="simple-list-container container">
            <div className="simple-list-header">
                <h2>{t('shop.title')}</h2>
            </div>

            <div className="simple-product-list">
                {products.map(product => (
                    <div key={product.id} className="simple-product-item">
                        <div className="simple-product-info">
                            <div className="simple-product-category">{getLocalized(product.category)}</div>
                            <h3 className="simple-product-name">
                                <Link to={`/product/${product.id}`}>{getLocalized(product.name)}</Link>
                            </h3>
                            <div className="simple-product-price">{product.price.toLocaleString()}원</div>
                        </div>
                        <div className="simple-product-action">
                            <button
                                className="btn btn-primary btn-buy-now"
                                onClick={() => handleBuyNow(product)}
                            >
                                {t('mode.buyNow')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AuthUpsellModal
                isOpen={showUpsell}
                onClose={() => setShowUpsell(false)}
                onConfirm={handleUpsellConfirm}
            />
        </div>
    );
};

export default SimpleProductList;
