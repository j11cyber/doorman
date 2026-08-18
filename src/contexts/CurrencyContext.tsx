import { createContext, useContext, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  rate: number;
  locale: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (priceNGN: number) => string;
  availableCurrencies: Currency[];
}

const defaultCurrency: Currency = {
  code: 'NGN',
  symbol: '₦',
  rate: 1,
  locale: 'en-NG',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const formatPrice = (priceNGN: number): string => {
    return `₦${Math.round(priceNGN).toLocaleString('en-NG')}`;
  };

  const setCurrency = () => {
    // Standardized to Nigerian Naira (NGN)
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: defaultCurrency,
        setCurrency,
        formatPrice,
        availableCurrencies: [defaultCurrency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
