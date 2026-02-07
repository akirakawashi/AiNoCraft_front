import React from 'react';
import '../../styles/news-modal.css';

const NewsModal = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="news-modal-close" onClick={onClose}>✕</button>

        <div className="news-modal-image">
          <img src={news.image} alt={news.title} />
        </div>

        <div className="news-modal-body">
          <div className="news-modal-header">
            <span className="news-modal-category">{news.category}</span>
            <span className="news-modal-date">{news.date}</span>
          </div>

          <h2 className="news-modal-title">{news.title}</h2>

          <div className="news-modal-stats">
            <span>👁️ {news.views} просмотров</span>
          </div>

          <div className="news-modal-divider"></div>

          <p className="news-modal-full-content">{news.content}</p>

          <button className="news-modal-close-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
