import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './AuthUpsellModal.css';

const AuthUpsellModal = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-body">
                    <div className="modal-icon">🎁</div>
                    <h3 className="modal-title">
                        {t('upsell.title')} <span className="highlight">{t('upsell.highlight')}</span>{t('upsell.suffix')}
                    </h3>
                    <p className="modal-desc">{t('upsell.desc')}</p>

                    <div className="modal-actions">
                        <button className="btn btn-primary btn-full" onClick={handleSignup}>
                            {t('upsell.signupBtn')}
                        </button>
                        <button className="btn btn-text" onClick={onConfirm}>
                            {t('upsell.noThanks')}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AuthUpsellModal;
