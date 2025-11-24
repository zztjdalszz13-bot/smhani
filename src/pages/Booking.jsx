import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Login.css'; // Reuse Login styles for consistency

const CLINIC_HOURS = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const Booking = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [symptom, setSymptom] = useState('');
    const [loading, setLoading] = useState(false);
    const [reservationCounts, setReservationCounts] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (date) {
            fetchReservationCounts(date);
        } else {
            setReservationCounts({});
        }
    }, [date]);

    const fetchReservationCounts = async (selectedDate) => {
        try {
            const { data, error } = await supabase.rpc('get_daily_reservation_counts', {
                check_date: selectedDate
            });

            if (error) throw error;

            // Convert array to object for easier lookup: { "09:00": 2, "10:00": 0, ... }
            const counts = {};
            // Initialize all hours with 0
            CLINIC_HOURS.forEach(h => counts[h] = 0);

            // Update with actual data
            if (data) {
                console.log('RPC 결과 (Updated):', data); // Debug log
                data.forEach(item => {
                    // API now returns booking_time in HH:mm format
                    if (!item.booking_time) return;

                    const timeKey = item.booking_time;
                    if (counts.hasOwnProperty(timeKey)) {
                        counts[timeKey] = item.count;
                    }
                });
            }

            setReservationCounts(counts);
        } catch (error) {
            console.error('Error fetching reservation counts:', error);
        }
    };

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

    const getTimeSlotStyle = (count) => {
        if (count === 0) return { color: '#22c55e' }; // Green
        if (count < 5) return { color: '#f97316' }; // Orange
        return { color: '#ef4444', fontWeight: 'bold' }; // Red Bold
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
                        <div className="time-grid">
                            {CLINIC_HOURS.map((hour) => {
                                const count = reservationCounts[hour] || 0;
                                const style = getTimeSlotStyle(count);
                                const isSelected = time === hour;

                                return (
                                    <div
                                        key={hour}
                                        className={`time-btn ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setTime(hour)}
                                    >
                                        <span className="time-text">{hour}</span>
                                        <span className="congestion-info" style={style}>
                                            예약 {count}명
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
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

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading || !time}>
                        {loading ? '예약 중...' : '예약하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Booking;
