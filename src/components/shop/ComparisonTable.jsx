// src/components/shop/ComparisonTable.jsx
import React from 'react';
import { comparisonData } from '../../data/privileges';

const ComparisonTable = () => {
  const tiers = ['VIP', 'Loli', 'Premium', 'Delux', 'Ultra', 'Legenda'];

  return (
    <section className="comparison-section">
      <div className="section-header">
        <h2>Сравнение привилегий</h2>
        <p className="section-subtitle">Подробное сравнение всех возможностей</p>
      </div>

      <div className="comparison-container">
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-cell">Возможность</th>
                {tiers.map((tier, index) => (
                  <th className="tier-cell" key={index}>
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.features.map((feature, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="feature-cell">{feature}</td>
                  {tiers.map((tier, colIndex) => {
                    const value = comparisonData.values[tier][rowIndex];
                    return (
                      <td className="tier-cell" key={colIndex}>
                        {value === '✓' ? (
                          <span className="check-icon">{value}</span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;