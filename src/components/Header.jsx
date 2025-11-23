import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Globe, User, LogOut, Zap, LayoutTemplate } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useViewMode } from '../contexts/ViewModeContext';
import { useCart } from '../contexts/CartContext';
import './Header.css';

const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const { viewMode, toggleViewMode } = useViewMode();
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-area">
          <div className="logo">
            <Link to="/">청본당</Link>
          </div>
          <button
            className={`mode-toggle-btn ${viewMode === 'simple' ? 'active' : ''}`}
            onClick={toggleViewMode}
            title={viewMode === 'default' ? t('mode.simple') : t('mode.default')}
          >
            {viewMode === 'default' ? <Zap size={16} /> : <LayoutTemplate size={16} />}
            <span className="mode-text">
              {viewMode === 'default' ? t('mode.simple') : t('mode.default')}
            </span>
          </button>
        </div>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/shop" className="nav-link">{t('nav.shop')}</Link>
          <Link to="/about" className="nav-link">{t('nav.about')}</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn lang-btn" onClick={toggleLanguage}>
            <Globe size={20} />
            <span className="lang-text">{language === 'ko' ? 'EN' : 'KR'}</span>
          </button>

          {user ? (
            <button className="icon-btn" onClick={logout} title={t('auth.logoutBtn')}>
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/login" className="icon-btn" title={t('auth.loginTitle')}>
              <User size={20} />
            </Link>
          )}

          <Link to="/cart" className="icon-btn">
            <ShoppingBag size={24} />
            <span className="cart-count">{cartCount}</span>
          </Link>
          <button className="icon-btn mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
