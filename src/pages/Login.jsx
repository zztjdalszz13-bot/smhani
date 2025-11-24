import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            navigate('/');
        } catch (err) {
            setError(t('auth.loginError'));
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">{t('auth.loginTitle')}</h2>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">{t('auth.email')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{t('auth.password')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn">
                        {t('auth.loginBtn')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {t('auth.noAccount')} <Link to="/signup">{t('auth.signup')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
