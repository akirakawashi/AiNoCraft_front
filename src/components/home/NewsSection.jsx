// src/components/home/NewsSection.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { newsData } from '../../data/news';

const NewsCard = ({ date, category, title, description, image, isFeatured = false, newsId = null }) => {
  if (isFeatured) {
    return (
      <article className="home-news-card home-news-card-featured">
        <div className="home-featured-image-container">
          <img src={image} alt={title} className="home-news-image" />
        </div>
        <div className="home-featured-content-container">
          <div className="news-header">
            <span className="home-news-category">{category}</span>
            <span className="home-news-date">{date}</span>
          </div>
          <h3 className="news-title">{title}</h3>
          <p className="news-excerpt">{description}</p>
          <Link to={`/news?newsId=${newsId}`} className="home-news-link">Читать подробнее →</Link>
        </div>
      </article>
    );
  }
  
  return (
    <article className="home-news-card">
      <div className="news-card-image">
        <div className="news-image-placeholder">📰</div>
      </div>
      <div className="home-news-content">
        <div className="news-header">
          <span className="home-news-category">{category}</span>
          <span className="home-news-date">{date}</span>
        </div>
        <h3 className="news-title">{title}</h3>
        <p className="news-excerpt">{description}</p>
        <Link to={`/news?newsId=${newsId}`} className="home-news-link">Читать подробнее →</Link>
      </div>
    </article>
  );
};

const NewsSection = () => {
  const navigate = useNavigate();

  // Получаем последние 4 новости и трансформируем их в нужный формат
  const latestNews = newsData.slice(0, 4).map((news, index) => ({
    date: news.date,
    category: news.category,
    title: news.title,
    description: news.excerpt,
    image: news.image,
    isFeatured: index === 0, // Первая новость - featured
    newsId: news.id // Добавляем ID новости
  }));

  const handleViewAllNews = () => {
    navigate('/news');
  };

  return (
    <section className="home-news-section">
      <div className="section-header">
        <h2>Последние новости</h2>
        <p className="section-subtitle">Следите за обновлениями и событиями сервера</p>
      </div>
      
      <div className="home-news-grid">
        {latestNews.map((item, index) => (
          <NewsCard key={index} {...item} image={item.image} />
        ))}
      </div>
      
      <div className="home-news-cta">
        <button onClick={handleViewAllNews} className="home-news-button">Все новости →</button>
      </div>
    </section>
  );
};

export default NewsSection;