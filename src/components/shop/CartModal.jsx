// src/components/shop/CartModal.jsx
import React from 'react';

const CartModal = ({ items, total, onClose, onRemove, onCheckout }) => {
  // Закрытие по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target.className === 'cart-overlay active') {
      onClose();
    }
  };

  // Закрытие по ESC
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="cart-overlay active" onClick={handleOverlayClick}>
      <div className="cart-container">
        <div className="cart-header">
          <h2>Оформление заказа</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          <div className="cart-items-container">
            {items.length === 0 ? (
              <div className="cart-empty" style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: 'rgba(255, 255, 255, 0.6)' 
              }}>
                <span style={{ fontSize: '48px' }}>🛒</span>
                <h3 style={{ margin: '20px 0 10px', color: '#ffffff' }}>
                  Корзина пуста
                </h3>
                <p>Добавьте привилегии, чтобы продолжить</p>
              </div>
            ) : (
              items.map((item) => (
                <div className="cart-item" key={item.id} data-tier={item.id}>
                  <div className="cart-item-info">
                    <div className={`cart-item-image-container ${item.gradientClass}`}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="cart-item-image"
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.title} привилегия</h3>
                      <p className="cart-item-description">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    <span className="price">{item.price.toLocaleString('ru-RU')} ₽</span>
                    <button 
                      className="remove-item"
                      onClick={() => onRemove(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Сумма:</span>
              <span className="cart-total">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="summary-row total">
              <span>Итого:</span>
              <span className="cart-final">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
          
          <div className="cart-actions">
            <button 
              className="checkout-button" 
              onClick={onCheckout}
              disabled={items.length === 0}
            >
              Перейти к оплате
            </button>
            <button 
              className="continue-shopping" 
              onClick={onClose}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;