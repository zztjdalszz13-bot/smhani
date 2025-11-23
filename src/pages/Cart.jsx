import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();

    const getLocalized = (obj) => obj[language] || obj['ko'];

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        alert('Checkout functionality coming soon!');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2>{t('cart.emptyTitle')}</h2>
                <p>{t('cart.emptyDesc')}</p>
                <Link to="/shop" className="btn btn-primary">
                    {t('cart.continueShopping')}
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="cart-title">{t('cart.title')}</h1>

            <div className="cart-grid">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={getLocalized(item.name)} />
                            </div>

                            <div className="cart-item-info">
                                <div className="cart-item-header">
                                    <h3 className="cart-item-name">
                                        <Link to={`/product/${item.id}`}>{getLocalized(item.name)}</Link>
                                    </h3>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="cart-item-details">
                                    <div className="cart-item-price">
                                        {item.price.toLocaleString()}원
                                    </div>

                                    <div className="quantity-control small">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus size={14} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-total">
                                    {(item.price * item.quantity).toLocaleString()}원
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>{t('cart.summaryTitle')}</h2>

                    <div className="summary-row">
                        <span>{t('cart.subtotal')}</span>
                        <span>{cartTotal.toLocaleString()}원</span>
                    </div>

                    <div className="summary-row">
                        <span>{t('product.shipping')}</span>
                        <span>
                            {cartTotal >= 50000 ? '0원' : '3,000원'}
                        </span>
                    </div>

                    <div className="summary-total">
                        <span>{t('cart.total')}</span>
                        <span>
                            {(cartTotal + (cartTotal >= 50000 ? 0 : 3000)).toLocaleString()}원
                        </span>
                    </div>

                    <button className="btn btn-primary btn-full checkout-btn" onClick={handleCheckout}>
                        {t('cart.checkout')} <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
