import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'Dollar US' },
  { code: 'MGA', symbol: 'Ar', name: 'Ariary Malgache' },
  { code: 'GBP', symbol: '£', name: 'Livre Sterling' },
  { code: 'JPY', symbol: '¥', name: 'Yen Japonais' },
  { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse' },
  { code: 'CAD', symbol: 'C$', name: 'Dollar Canadien' },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = '@cave_ray_currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // Euro par défaut
  const [loading, setLoading] = useState(true);

  // Charger la devise sauvegardée au démarrage
  useEffect(() => {
    loadSavedCurrency();
  }, []);

  async function loadSavedCurrency() {
    try {
      const savedCurrencyCode = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedCurrencyCode) {
        const savedCurrency = CURRENCIES.find(c => c.code === savedCurrencyCode);
        if (savedCurrency) {
          setCurrencyState(savedCurrency);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la devise:', error);
    } finally {
      setLoading(false);
    }
  }

  async function setCurrency(newCurrency: Currency) {
    try {
      setCurrencyState(newCurrency);
      await AsyncStorage.setItem(STORAGE_KEY, newCurrency.code);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la devise:', error);
    }
  }

  function formatCurrency(amount: number): string {
    const formatted = amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    // Placer le symbole selon la devise
    if (currency.code === 'EUR') {
      return `${formatted} ${currency.symbol}`;
    } else if (currency.code === 'MGA') {
      return `${formatted} ${currency.symbol}`;
    } else {
      return `${currency.symbol}${formatted}`;
    }
  }

  if (loading) {
    return null; // ou un loading spinner
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
