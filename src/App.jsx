import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PersonalAccountPage from './pages/PersonalAccountPage';
import TermsPage from './pages/TermsPage';
import NewsPage from './pages/NewsPage';
import LauncherPage from './pages/LauncherPage';
import ComingSoonPage from './pages/ComingSoonPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/global.css';


function AppContent() {
  const { isInitialized } = useAuth();
  
    // const DEV_SHOW_LOADING = true;
  
  // const showLoading = DEV_SHOW_LOADING || isInitialized;

  if (!isInitialized) {
    return (
      <>
        <div className="glass-bg"></div>
        <div className="liquid-overlay"></div>
        <div className="loading-container">
            <img className="loading-image" src={require('./assets/imges/loading_gif.gif')} alt="Загрузка..." />
            <div className="loading-text">Загрузка...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="app">
        <div className="glass-bg"></div>
        <div className="liquid-overlay"></div>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/launcher" element={<LauncherPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="/account" element={
              <ProtectedRoute>
                <PersonalAccountPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;