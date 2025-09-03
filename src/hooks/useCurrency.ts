import { useState, useEffect } from 'react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

const currencyMap: Record<string, CurrencyConfig> = {
  'BR': { code: 'BRL', symbol: 'R$', name: 'Real' },
  'US': { code: 'USD', symbol: '$', name: 'Dollar' },
  'ES': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'DE': { code: 'EUR', symbol: '€', name: 'Euro' }
};

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyConfig>(currencyMap['BR']);

  useEffect(() => {
    const savedRegion = localStorage.getItem('trendfy-region') || 'BR';
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
    // Conversão simplificada para demo
    const rates: Record<string, number> = {
      'BR': 1,
      'US': 0.18, // 1 BRL = ~0.18 USD
      'ES': 0.17, // 1 BRL = ~0.17 EUR
      'FR': 0.17,
      'IT': 0.17,
      'DE': 0.17
    };

    const savedRegion = localStorage.getItem('trendfy-region') || 'BR';
    const rate = rates[savedRegion] || 1;
    
    return basePrice * rate;
  };

  return {
    currency,
    formatPrice,
    convertPrice
  };
}