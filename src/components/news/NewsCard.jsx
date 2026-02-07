import React from 'react';

const NewsCard = ({ id, title, date, category, image, excerpt, content, views, isFeatured = false, onReadMore }) => {
  const handleReadMore = (e) => {
    e.preventDefault();
    if (onReadMore) {
      onReadMore({ id, title, date, category, image, excerpt, content, views });
    }
  };

  return (
    <div className={`news-card ${isFeatured ? 'news-card-featured' : ''}`}>
      {isFeatured ? (
        <>
          <div className="featured-image-container">
            <img src={image} alt={title} className="news-image" />
          </div>

          <div className="featured-content-container">
            <div className="news-header">
              <span className="news-category">{category}</span>
              <span className="news-date">{date}</span>
            </div>

            <h3 className="news-title">{title}</h3>

            <p className="news-excerpt">{excerpt}</p>

            <div className="news-footer">
              <span className="news-views">👁️ {views} просмотров</span>
              <a href="/todo" className="news-read-more" onClick={handleReadMore}>
                Читать далее →
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="news-card-image">
            <img src={image} alt={title} className="news-image" />
          </div>

          <div className="news-card-content">
            <div className="news-header">
              <span className="news-category">{category}</span>
              <span className="news-date">{date}</span>
            </div>

            <h3 className="news-title">{title}</h3>

            <p className="news-excerpt">{excerpt}</p>

            <div className="news-footer">
              <span className="news-views">👁️ {views} просмотров</span>
              <a href="/todo" className="news-read-more" onClick={handleReadMore}>
                Читать далее →
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsCard;
