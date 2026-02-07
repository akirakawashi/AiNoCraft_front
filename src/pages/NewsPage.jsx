import React, { useState, useEffect } from 'react';
import NewsGrid from '../components/news/NewsGrid';
import NewsModal from '../components/news/NewsModal';
import { newsData, getNewsById } from '../data/news';
import '../styles/news.css';

const NewsPage = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Проверяем наличие параметра newsId в URL
    const searchParams = new URLSearchParams(window.location.search);
    const newsId = searchParams.get('newsId');
    
    if (newsId) {
      const news = getNewsById(parseInt(newsId));
      if (news) {
        setSelectedNews(news);
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    // Убираем параметр из URL
    window.history.pushState({}, document.title, window.location.pathname);
  };

  return (
    <div className="news-page">
      <div className="news-page-header">
        <h1>Новости сервера</h1>
        <p className="news-page-subtitle">
          Следите за последними обновлениями и событиями на AiNoCraft
        </p>
      </div>

      <div className="news-page-container">
        <NewsGrid news={newsData} />
      </div>

      <NewsModal news={selectedNews} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default NewsPage;
