import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; // Reuse basic styles

const Admin = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            if (!user || user.email !== 'zztjdalszz13@naver.com') {
                alert('관리자만 접근 가능합니다.');
                navigate('/');
                return;
            }
            fetchReservations();
        }
    }, [user, isLoading, navigate]);

    const fetchReservations = async () => {
        try {
            const { data, error } = await supabase
                .from('reservations')
                .select('*')
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (error) throw error;
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            alert('예약 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 이 예약을 삭제하시겠습니까?')) return;

        try {
            const { error } = await supabase
                .from('reservations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setReservations(reservations.filter(r => r.id !== id));
            alert('예약이 삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('삭제 실패');
        }
    };

    if (loading || isLoading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>관리자 페이지 - 예약 관리</h2>

            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>날짜</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>시간</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>이름</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>이메일</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>증상</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{reservation.date}</td>
                                <td style={{ padding: '1rem' }}>{reservation.time}</td>
                                <td style={{ padding: '1rem' }}>{reservation.name}</td>
                                <td style={{ padding: '1rem' }}>{reservation.user_email}</td>
                                <td style={{ padding: '1rem' }}>{reservation.symptom}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(reservation.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#ff4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reservations.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                    예약 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
