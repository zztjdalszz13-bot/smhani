import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
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

        const shippingCost = cartTotal >= 50000 ? 0 : 3000;
        const finalAmount = cartTotal + shippingCost;
        const merchantUid = `order_${new Date().getTime()}`;
        const name = cartItems.length > 1
            ? `${getLocalized(cartItems[0].name)} 외 ${cartItems.length - 1}건`
            : getLocalized(cartItems[0].name);

        if (!window.IMP) return;
        const { IMP } = window;
        IMP.init(import.meta.env.VITE_PORTONE_MERCHANT_ID);

        const data = {
            pg: 'html5_inicis', // PG사
            pay_method: 'vbank', // 결제수단 (테스트용 가상계좌)
            merchant_uid: merchantUid, // 주문번호
            name: name, // 주문명
            amount: finalAmount, // 결제금액
            buyer_email: user.email,
            buyer_name: user.user_metadata?.full_name || user.email,
            buyer_tel: '010-1234-5678', // 임시 전화번호
            buyer_addr: '서울시 강남구', // 임시 주소
            buyer_postcode: '12345', // 임시 우편번호
            m_redirect_url: window.location.origin, // 모바일 리다이렉트 URL
        };

        IMP.request_pay(data, callback);
    };

    const callback = async (response) => {
        const { success, error_msg, merchant_uid, name, paid_amount, pay_method } = response;
        if (success) {
            try {
                const { error } = await supabase
                    .from('orders')
                    .insert([
                        {
                            user_id: user.id,
                            order_uid: merchant_uid,
                            product_name: name,
                            amount: paid_amount,
                            pay_method: pay_method,
                            status: 'paid',
                        },
                    ])
                    .select();

                if (error) throw error;

                alert('결제 성공!');
                clearCart();
                navigate('/mypage');
            } catch (error) {
                console.error('주문 저장 오류:', error);
                alert('결제는 성공했으나 주문 저장에 실패했습니다. 관리자에게 문의하세요.');
            }
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
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
