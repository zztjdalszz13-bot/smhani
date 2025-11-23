import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthUpsellModal from './AuthUpsellModal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [showUpsell, setShowUpsell] = useState(false);

    const getLocalized = (obj) => obj[language] || obj['ko'];

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent link navigation if wrapped in Link

        if (!user) {
            setShowUpsell(true);
        } else {
            addToCart(product);
            alert(t('cart.added'));
        }
    };

    const handleUpsellConfirm = () => {
        setShowUpsell(false);
        addToCart(product);
        alert(t('cart.added'));
    };

    return (
        <>
            <div className="product-card">
                <div className="product-image-container">
                    <img className="product-image" src={product.image} alt={getLocalized(product.name)} />
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <ShoppingBag size={20} />
                    </button>
                </div>
                <div className="product-info">
                    <div className="product-category">{getLocalized(product.category)}</div>
                    <h3 className="product-name">
                        <Link to={`/product/${product.id}`}>{getLocalized(product.name)}</Link>
                    </h3>
                    <div className="product-price">{product.price.toLocaleString()}원</div>
                </div>
            </div>

            <AuthUpsellModal
                isOpen={showUpsell}
                onClose={() => setShowUpsell(false)}
                onConfirm={handleUpsellConfirm}
            />
        </>
    );
};

export default ProductCard;
