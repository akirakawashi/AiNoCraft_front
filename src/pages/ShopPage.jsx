// src/pages/ShopPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroSection from '../components/shop/HeroSection';
import PrivilegeGrid from '../components/shop/PrivilegeGrid';
import ComparisonTable from '../components/shop/ComparisonTable';
import FAQSection from '../components/shop/FAQSection';
import CTASection from '../components/shop/CTASection';
import CartModal from '../components/shop/CartModal';
import DetailsModal from '../components/shop/DetailsModal';
import '../styles/shop.css';

const ShopPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [selectedPrivilege, setSelectedPrivilege] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleAddToCart = (privilege) => {
    if (!isAuthenticated) {
      alert('Для добавления товара в корзину необходимо авторизоваться');
      navigate('/login');
      return;
    }
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === privilege.id);
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = privilege;
        return updated;
      } else {

        return [...prev, privilege];
      }
    });
    
    // Показываем уведомление (можно реализовать позже)
    console.log(`${privilege.title} добавлено в корзину`);
    
    // Открываем корзину через 0.5 секунды
    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  // УДАЛЕНИЕ ИЗ КОРЗИНЫ
  const handleRemoveFromCart = (privilegeId) => {
    setCartItems(prev => prev.filter(item => item.id !== privilegeId));
  };

  // ОТКРЫТИЕ ДЕТАЛЕЙ ПРИВИЛЕГИИ
  const handleOpenDetails = (privilege) => {
    setSelectedPrivilege(privilege);
    setIsDetailsOpen(true);
  };

  // ОФОРМЛЕНИЕ ЗАКАЗА
  const handleCheckout = () => {
    // Дополнительная проверка при оформлении заказа
    if (!isAuthenticated) {
      alert('Для оформления заказа необходимо авторизоваться');
      navigate('/login');
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Добавьте привилегии в корзину');
      return;
    }
    
    // Имитация оформления заказа
    console.log('Переход к оплате:', cartItems);
    alert(`Оформлен заказ на сумму: ${cartTotal} ₽`);
    
    // Очищаем корзину
    setCartItems([]);
    setIsCartOpen(false);
  };

  // ПОДСЧЁТ ИТОГОЙ СУММЫ
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="content">
        {/* 
          КОММЕНТАРИЙ: В оригинальном HTML здесь был div с классом "content"
          Мы оборачиваем всё в него, чтобы стили работали правильно
        */}
      
      {/* Герой-секция */}
      <HeroSection />
      
      {/* Сетка привилегий */}
      <PrivilegeGrid 
        onAddToCart={handleAddToCart}
        onOpenDetails={handleOpenDetails}
      />
      
      {/* Таблица сравнения */}
      <ComparisonTable />
      
      {/* FAQ секция */}
      <FAQSection />
      
      {/* CTA секция */}
      <CTASection />
      
      {/* 
        КОММЕНТАРИЙ: Модальные окна рендерятся условно.
        Они не в DOM когда не нужны.
      */}
      
      {/* Модальное окно корзины */}
      {isCartOpen && (
        <CartModal
          items={cartItems}
          total={cartTotal}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
      
      {/* Модальное окно деталей привилегии */}
      {isDetailsOpen && selectedPrivilege && (
        <DetailsModal
          privilege={selectedPrivilege}
          onClose={() => setIsDetailsOpen(false)}
          onAddToCart={() => {
            handleAddToCart(selectedPrivilege);
            setIsDetailsOpen(false);
          }}
        />
      )}
      </div>
    </>
  );
};

export default ShopPage;