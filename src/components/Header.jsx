import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_AVATAR, DEFAULT_RING_COLOR } from '../data/defaults';

const Header = () => {
  const { isAuthenticated, user, logout, avatar } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggingOut(false);
    }
  };

  // Закрытие мобильного меню при клике на ссылку
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };


  const providedColor = user && (user.privilegeColor || user.avatarColor);
  const ringColor = providedColor || DEFAULT_RING_COLOR;

  return (
    <>
      {isLoggingOut && (
        <div className="loading-container">
          <img className="loading-image" src={require('../assets/imges/loading_gif.gif')} alt="Загрузка..." />
          <div className="loading-text">Выход...</div>
        </div>
      )}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-brand" onClick={handleMobileLinkClick}>AiNoCraft</Link>
            
            {/* Гамбургер-меню для мобильных */}
            <button 
              className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Десктопное меню */}
            <div className="nav-menu">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Главная
              </NavLink>
              <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Новости
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Магазин
              </NavLink>
              
              {/* Dropdown меню "Прочее" */}
              <div 
                className="nav-dropdown"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="nav-link dropdown-trigger">
                  Прочее
                </button>
                <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                  
                  {/* Основное */}
                  <div className="dropdown-group">
                    <div className="group-title">Основное</div>
                    <Link to="/launcher" className="dropdown-item">Начать игру</Link>
                    {!isAuthenticated && <Link to="/register" className="dropdown-item">Регистрация</Link>}
                    <a href="/coming-soon" className="dropdown-item">Тех поддержка</a>
                  </div>

                  {/* Активность */}
                  <div className="dropdown-group">
                    <div className="group-title">Активность</div>
                    <a href="/coming-soon" className="dropdown-item">Бонусы</a>
                    <a href="/coming-soon" className="dropdown-item">Топ игроков</a>
                  </div>

                  {/* Наши соцсети */}
                  <div className="dropdown-group">
                    <div className="group-title">Наши соцсети</div>
                    <a href="https://discord.gg/y3UWMytaPG" target="_blank" rel="noopener noreferrer" className="dropdown-item">Discord</a>
                    <a href="/coming-soon" className="dropdown-item">YouTube</a>
                    <a href="https://t.me/ainocraft_official" target="_blank" rel="noopener noreferrer" className="dropdown-item">Telegram</a>
                    <a href="https://vk.com/ainocraft" target="_blank" rel="noopener noreferrer" className="dropdown-item">VKontakte</a>
                  </div>

                  {/* Другое */}
                  <div className="dropdown-group">
                    <div className="group-title">Другое</div>
                    <Link to="/terms" className="dropdown-item">Правила</Link>
                    <a href="/coming-soon" className="dropdown-item">Карта сервера</a>
                    <a href="/coming-soon" className="dropdown-item">Банлист</a>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Мобильное меню */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {/* Мобильные ссылки навигации */}
            <div className="mobile-nav-links">
              <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileLinkClick}>
                Главная
              </NavLink>
              <NavLink to="/news" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileLinkClick}>
                Новости
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileLinkClick}>
                Магазин
              </NavLink>
              <NavLink to="/launcher" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileLinkClick}>
                Начать игру
              </NavLink>

              {/* Мобильное dropdown */}
              <div className="mobile-dropdown">
                <button 
                  className="mobile-dropdown-trigger"
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                >
                  Прочее
                  <span className={`dropdown-arrow ${isMobileDropdownOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isMobileDropdownOpen && (
                  <div className="mobile-dropdown-content">
                    <div className="mobile-dropdown-group">
                      <div className="mobile-group-title">Основное</div>
                      {!isAuthenticated && <Link to="/register" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Регистрация</Link>}
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Тех поддержка</a>
                    </div>

                    <div className="mobile-dropdown-group">
                      <div className="mobile-group-title">Активность</div>
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Бонусы</a>
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Топ игроков</a>
                    </div>

                    <div className="mobile-dropdown-group">
                      <div className="mobile-group-title">Наши соцсети</div>
                      <a href="https://discord.gg/y3UWMytaPG" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-item">Discord</a>
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>YouTube</a>
                      <a href="https://t.me/ainocraft_official" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-item">Telegram</a>
                      <a href="https://vk.com/ainocraft" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-item">VKontakte</a>
                    </div>

                    <div className="mobile-dropdown-group">
                      <div className="mobile-group-title">Другое</div>
                      <Link to="/terms" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Правила</Link>
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Карта сервера</a>
                      <a href="/coming-soon" className="mobile-dropdown-item" onClick={handleMobileLinkClick}>Банлист</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Мобильная авторизация */}
              {!isAuthenticated && (
                <div className="mobile-auth-buttons">
                  <Link to="/login" className="mobile-auth-button" onClick={handleMobileLinkClick}>Войти</Link>
                  <Link to="/register" className="mobile-auth-button mobile-auth-primary" onClick={handleMobileLinkClick}>Регистрация</Link>
                </div>
              )}
            </div>

            {/* Мобильный профиль */}
            {isAuthenticated && (
              <div className="mobile-user-section">
                <Link to="/account" className="mobile-user-info" onClick={handleMobileLinkClick}>
                  <div className="mobile-user-avatar" style={{ border: `2px solid ${ringColor}` }}>
                    <img src={avatar || DEFAULT_AVATAR} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                  </div>
                  <span className="mobile-user-name">{user?.login || 'User'}</span>
                </Link>
                <button onClick={handleLogout} className="mobile-logout-button" disabled={isLoggingOut}>
                  {isLoggingOut ? 'Выход...' : 'Выйти'}
                </button>
              </div>
            )}
          </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              <Link to="/account" className="user-info">
                <div className="user-avatar" style={{ border: `2px solid ${ringColor}` }}>
                  <img src={avatar || DEFAULT_AVATAR} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                </div>
                <span className="user-name">{user?.login || 'User'}</span>
              </Link>
              <button onClick={handleLogout} className="button_lnk logout-button" disabled={isLoggingOut}>
                {isLoggingOut ? 'Выход...' : 'Выйти'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button_lnk">Войти</Link>
              <Link to="/register" className="button_lnk button-primary">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;