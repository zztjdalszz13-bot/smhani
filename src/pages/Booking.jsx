import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Login.css'; // Reuse Login styles for consistency

const Booking = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [symptom, setSymptom] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('reservations')
                .insert([
                    {
                        user_email: user.email,
                        name,
                        date,
                        time,
                        symptom
                    }
                ]);

            if (error) throw error;

            alert('예약이 완료되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Error booking:', error);
            alert('예약 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">진료 예약</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="예약자 성함"
                        />
                    </div>

                    <div className="form-group">
                        <label>날짜</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>시간</label>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        >
                            <option value="">시간 선택</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>증상</label>
                        <textarea
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            required
                            placeholder="증상을 간단히 적어주세요"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? '예약 중...' : '예약하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Booking;
