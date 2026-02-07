import React, { useState } from 'react';
import NewsCard from './NewsCard';
import NewsModal from './NewsModal';
import { getNewsCategories } from '../../data/news';

const NewsGrid = ({ news }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = getNewsCategories();

  const filteredNews = selectedCategory
    ? news.filter(item => item.category === selectedCategory)
    : news;

  // Первая новость - featured, остальные - обычные
  const featuredNews = filteredNews[0];
  const restNews = filteredNews.slice(1);

  const handleOpenModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="news-grid-section">
      {/* Фильтр по категориям */}
      <div className="news-filters">
        <button
          className={`filter-button ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          Все новости
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Основная новость на весь контейнер */}
      {filteredNews.length > 0 && (
        <div className="featured-news-container">
          <NewsCard {...featuredNews} isFeatured={true} onReadMore={handleOpenModal} />
        </div>
      )}

      {/* Сетка остальных новостей */}
      {restNews.length > 0 && (
        <div className="news-grid">
          {restNews.map(newsItem => (
            <NewsCard key={newsItem.id} {...newsItem} onReadMore={handleOpenModal} />
          ))}
        </div>
      )}

      {/* Пустое состояние */}
      {filteredNews.length === 0 && (
        <div className="news-empty">
          <p>Новостей в этой категории не найдено</p>
        </div>
      )}

      {/* Модальное окно */}
      <NewsModal news={selectedNews} isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Информация о количестве */}
      {filteredNews.length > 0 && (
        <div className="news-info">
          <p>Показано {filteredNews.length} из {news.length} новостей</p>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
