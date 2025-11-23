import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Login.css'; // Reuse Login styles

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError(t('signup.error'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('signup.passwordMismatch'));
            return;
        }

        // Mock signup - in a real app, this would call an API
        // For now, we just log them in with the provided email
        try {
            await login(email, password);
            alert(t('signup.success'));
            navigate('/');
        } catch (err) {
            setError('Failed to create account');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">{t('signup.title')}</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name">{t('signup.name')}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('signup.name')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">{t('auth.email')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="********"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">
                        {t('signup.submitBtn')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        <Link to="/login">{t('auth.loginTitle')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
