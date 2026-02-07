// src/components/home/TestimonialsSection.jsx
import React from 'react';

const TestimonialCard = ({ content, author, avatar, years }) => (
  <div className="testimonial-card">
    <div className="testimonial-content">
      <p>{content}</p>
    </div>
    <div className="testimonial-author">
      <div className="author-avatar">{avatar}</div>
      <div className="author-info">
        <h4>{author}</h4>
        <span>Играет {years}</span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "\"AiNoCraft - это совершенно новый уровень! Самописные моды и плагины созданы с любовью к деталям. Сервер только запустился, но уже чувствуется огромный потенциал!\"",
      author: "CraftMaster_2026",
      avatar: "C",
      years: "с запуска"
    },
    {
      content: "\"Собственная экономика и система лутбоксов супер балансированы. Кастомизация персонажа и интеграция с сайтом работают идеально. Это именно то, что нужно новому серверу!\"",
      author: "NovaBuilder",
      avatar: "N",
      years: "с запуска"
    },
    {
      content: "\"Своё измерение и уникальные ивенты уже приносят массу эмоций. Админы прилагают реальные усилия для развития AiNoCraft. Это будет легендарный сервер!\"",
      author: "AdventureSeeker",
      avatar: "A",
      years: "с запуска"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>Игроки о нас</h2>
        <p className="section-subtitle">Что говорят участники нашего сообщества</p>
      </div>
      
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;