// src/pages/LauncherPage.jsx
import React from 'react';
import LauncherHero from '../components/launcher/LauncherHero';
import LauncherDownloadSection from '../components/launcher/LauncherDownloadSection';
import LauncherSystemRequirements from '../components/launcher/LauncherSystemRequirements';
import '../styles/launcher.css';

const LauncherPage = () => {
  return (
    <div className="launcher-page">
      <LauncherHero />
      <LauncherDownloadSection />
      <LauncherSystemRequirements />
    </div>
  );
};

export default LauncherPage;
