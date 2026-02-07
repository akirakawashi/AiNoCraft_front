import React from 'react';
// Link removed: back-button was removed per design
import TermsContent from '../components/terms/TermsContent';
import '../styles/terms.css';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Документы сервера</h1>
          <p className="terms-description">
            Ознакомьтесь с правилами и политикой конфиденциальности нашего сервера
          </p>
        </div>

        <TermsContent />
      </div>
    </div>
  );
};

export default TermsPage;
