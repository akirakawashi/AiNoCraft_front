// src/components/shop/FAQSection.jsx
import React, { useState } from 'react';
import { faqData } from '../../data/privileges';

const FAQSection = () => {
  // СОСТОЯНИЕ: какой FAQ открыт (null если ни один)
  const [openFaqId, setOpenFaqId] = useState(null);

  // ФУНКЦИЯ переключения FAQ
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="section-header">
        <h2>Часто задаваемые вопросы</h2>
        <p className="section-subtitle">
          Ответы на популярные вопросы о покупке привилегий
        </p>
      </div>

      <div className="faq-container">
        {faqData.map((faq) => {
          const isOpen = openFaqId === faq.id;
          
          return (
            <div 
              className={`faq-item ${isOpen ? 'active' : ''}`} 
              key={faq.id}
            >
              {/* ВОПРОС - кликабельный заголовок */}
              <div 
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
                style={{ cursor: 'pointer' }}
              >
                <span className="faq-icon">{faq.icon}</span>
                <h3>{faq.question}</h3>
                <span className="faq-toggle">
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              
              {/* ОТВЕТ - появляется/скрывается */}
              <div 
                className="faq-answer"
                style={{
                  maxHeight: isOpen ? '500px' : '0',
                  transition: 'max-height 0.3s ease'
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;