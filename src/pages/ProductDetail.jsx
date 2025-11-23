import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Truck, MapPin } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthUpsellModal from '../components/AuthUpsellModal';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [showUpsell, setShowUpsell] = useState(false);

    const product = products.find(p => p.id === parseInt(id));
    const getLocalized = (obj) => obj[language] || obj['ko'];

    if (!product) return <div>Product not found</div>;

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            setShowUpsell(true);
        } else {
            addToCart(product, quantity);
            alert(t('cart.added'));
        }
    };

    const handleUpsellConfirm = () => {
        setShowUpsell(false);
        addToCart(product, quantity);
        alert(t('cart.added'));
    };

    return (
        <div className="product-detail-page container">
            <div className="product-detail-grid">
                <div className="product-detail-image">
                    <img src={product.image} alt={getLocalized(product.name)} />
                </div>

                <div className="product-detail-info">
                    <div className="product-category-badge">{getLocalized(product.category)}</div>
                    <h1 className="product-title">{getLocalized(product.name)}</h1>
                    <div className="product-price-large">{product.price.toLocaleString()}원</div>

                    <p className="product-description">
                        {getLocalized(product.description)}
                    </p>

                    <div className="product-meta">
                        <div className="meta-item">
                            <Truck size={20} />
                            <div>
                                <span className="meta-label">{t('product.shipping')}</span>
                                <span className="meta-value">{t('product.shippingDesc')}</span>
                            </div>
                        </div>
                        <div className="meta-item">
                            <MapPin size={20} />
                            <div>
                                <span className="meta-label">{t('product.origin')}</span>
                                <span className="meta-value">{t('product.originDesc')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="product-actions">
                        <div className="quantity-control">
                            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}>
                                <Plus size={16} />
                            </button>
                        </div>

                        <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                            <ShoppingBag size={20} />
                            {t('product.addToCart')}
                        </button>
                    </div>
                </div>
            </div>

            <AuthUpsellModal
                isOpen={showUpsell}
                onClose={() => setShowUpsell(false)}
                onConfirm={handleUpsellConfirm}
            />
        </div>
    );
};

export default ProductDetail;
