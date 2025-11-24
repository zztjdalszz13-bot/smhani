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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-area">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>청본당</Link>
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

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/shop" className="nav-link">{t('nav.shop')}</Link>
          <Link to="/about" className="nav-link">{t('nav.about')}</Link>
          {user && (
            <>
              <Link to="/booking" className="nav-link">진료 예약</Link>
              <Link to="/mypage" className="nav-link">마이페이지</Link>
            </>
          )}
          {user && user.email === 'zztjdalszz13@naver.com' && (
            <Link to="/admin" className="nav-link" style={{ color: '#ff4444' }}>관리자 페이지</Link>
          )}
        </nav>

        <div className="header-actions">
          {/* Desktop Language Button */}
          <button className="icon-btn lang-btn desktop-only" onClick={toggleLanguage}>
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

          <button className="icon-btn mobile-menu-btn" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'is-open' : ''}`} onClick={closeMenu}></div>
      <div className={`mobile-menu-drawer ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menu</span>

        </div>
        <nav className="drawer-nav">
          <Link to="/" className="drawer-link" onClick={closeMenu}>{t('nav.home')}</Link>
          <Link to="/shop" className="drawer-link" onClick={closeMenu}>{t('nav.shop')}</Link>
          <Link to="/about" className="drawer-link" onClick={closeMenu}>{t('nav.about')}</Link>
          {user && (
            <>
              <Link to="/booking" className="drawer-link" onClick={closeMenu}>진료 예약</Link>
              <Link to="/mypage" className="drawer-link" onClick={closeMenu}>마이페이지</Link>
            </>
          )}
          {user && user.email === 'zztjdalszz13@naver.com' && (
            <Link to="/admin" className="drawer-link" onClick={closeMenu} style={{ color: '#ff4444' }}>관리자 페이지</Link>
          )}

          <div className="drawer-divider"></div>

          <button className="drawer-link lang-toggle" onClick={() => { toggleLanguage(); closeMenu(); }}>
            <Globe size={18} style={{ marginRight: '8px' }} />
            {language === 'ko' ? 'English' : '한국어'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
