import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="nav-brand">AiNoCraft</div>
          <p>Современный Minecraft сервер с 2018 года. Присоединяйся к лучшему игровому сообществу!</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Навигация</h4>
            <Link to="/">Главная</Link>
            <Link to="/news">Новости</Link>
            <Link to="/shop">Магазин</Link>
            <a href="/todo">Карта сервера</a>
          </div>
          <div className="footer-column">
            <h4>Аккаунт</h4>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
            <a href="/todo">Восстановить пароль</a>
            <a href="/todo">Профиль</a>
          </div>
          <div className="footer-column">
            <h4>Информация</h4>
            <Link to="/terms">Правила сервера и Политика конфиденциальности</Link>
            <a href="/todo">Условия использования</a>
            <a href="/todo">Поддержка</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AiNoCraft. Все права защищены.</p>
        <p>Minecraft™ является торговой маркой Mojang Studios</p>
      </div>
    </footer>
  );
};

export default Footer;