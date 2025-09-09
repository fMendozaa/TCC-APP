import { useState, useEffect } from 'react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

const currencyMap: Record<string, CurrencyConfig> = {
  'BR': { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
  'US': { code: 'USD', symbol: '$', name: 'Dólar Americano' },
  'EU': { code: 'EUR', symbol: '€', name: 'Euro' },
  'UK': { code: 'GBP', symbol: '£', name: 'Libra Esterlina' },
  'JP': { code: 'JPY', symbol: '¥', name: 'Iene Japonês' },
  'CA': { code: 'CAD', symbol: 'C$', name: 'Dólar Canadense' }
};

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyConfig>(currencyMap['BR']);

  useEffect(() => {
    const savedRegion = localStorage.getItem('fastion-region') || 'BR';
    setCurrency(currencyMap[savedRegion] || currencyMap['BR']);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2
    }).format(price);
  };

  const convertPrice = (basePrice: number, fromRegion: string = 'BR') => {
    // Taxas de conversão simuladas para demonstração
    const rates: Record<string, number> = {
      'BR': 1,     // Real (base)
      'US': 0.18,  // Dólar
      'EU': 0.17,  // Euro  
      'UK': 0.15,  // Libra
      'JP': 26.8,  // Iene
      'CA': 0.24   // Dólar Canadense
    };

    const savedRegion = localStorage.getItem('fastion-region') || 'BR';
    const rate = rates[savedRegion] || 1;
    
    return basePrice * rate;
  };

  const changeRegion = (region: string) => {
    localStorage.setItem('fastion-region', region);
    setCurrency(currencyMap[region] || currencyMap['BR']);
  };

  return {
    currency,
    formatPrice,
    convertPrice,
    changeRegion
  };
}