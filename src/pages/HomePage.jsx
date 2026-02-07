import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AdvantagesSection from '../components/home/AdvantagesSection';
import GameModesSection from '../components/home/GameModesSection';
import GettingStartedSection from '../components/home/GettingStartedSection';
import GallerySection from '../components/home/GallerySection';
import LiveStatsSection from '../components/home/LiveStatsSection';
import NewsSection from '../components/home/NewsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import SocialSection from '../components/home/SocialSection';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      
      <div className="content">
        <HeroSection />
        <AdvantagesSection />
        <GameModesSection />
        <GettingStartedSection />
        <GallerySection />
        <LiveStatsSection />
        <NewsSection />
        <TestimonialsSection />
        <SocialSection />
      </div>
    </div>
  );
};

export default HomePage;