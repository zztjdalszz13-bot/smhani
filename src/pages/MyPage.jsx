import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; // Reuse basic styles

const MyPage = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                navigate('/login');
                return;
            }

            const fetchData = async () => {
                await Promise.all([fetchOrders(), fetchReservations()]);
                setLoading(false);
            };

            fetchData();
        }
    }, [user, isLoading, navigate]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            // User requested to use user_id and order by created_at
            const { data, error } = await supabase
                .from('reservations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReservations(data || []);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleCancelReservation = async (id) => {
        if (!window.confirm('정말 예약을 취소하시겠습니까?')) return;

        try {
            const { error } = await supabase
                .from('reservations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setReservations(reservations.filter(r => r.id !== id));
            alert('예약이 취소되었습니다.');
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            alert('취소 실패');
        }
    };

    if (loading || isLoading) return <div className="container" style={{ padding: '2rem' }}>데이터를 불러오는 중...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>마이페이지</h2>

            {/* 진료 예약 섹션 */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>나의 진료 예약</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <div key={reservation.id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                padding: '1.5rem',
                                border: '1px solid #eee'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                                            예약일: {reservation.date} {reservation.time}
                                        </div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            {reservation.symptom || '진료 내용 없음'}
                                        </h4>
                                        <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                                            예약자: {reservation.name}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCancelReservation(reservation.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#fff',
                                            border: '1px solid #ff4444',
                                            color: '#ff4444',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        예약 취소
                                    </button>
                                </div>
                                {reservation.created_at && (
                                    <div style={{ fontSize: '0.8rem', color: '#aaa', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                                        신청일: {new Date(reservation.created_at).toLocaleString()}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#666', background: '#f9f9f9', borderRadius: '8px' }}>
                            예약 내역이 없습니다.
                        </div>
                    )}
                </div>
            </section>

            {/* 주문 완료 섹션 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 mt-8" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '2rem' }}>나의 주문 내역</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} style={{
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                                        {new Date(order.created_at).toLocaleString()}
                                    </div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                        {order.product_name}
                                    </h4>
                                    <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                        주문번호: {order.order_uid}
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                        {order.amount.toLocaleString()}원
                                    </div>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        background: order.status === 'paid' ? '#e6f4ea' : '#fce8e6',
                                        color: order.status === 'paid' ? '#1e7e34' : '#d93025',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}>
                                        {order.status === 'paid' ? '결제 완료' : '결제 실패'}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                        {order.pay_method === 'vbank' ? '가상계좌' : '카드결제'}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            padding: '3rem',
                            textAlign: 'center',
                            color: '#666'
                        }}>
                            아직 주문 내역이 없습니다.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyPage;
