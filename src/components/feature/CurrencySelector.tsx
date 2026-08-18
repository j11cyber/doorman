import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#2A2A2A] bg-[#121212]/80 hover:border-[#C5A880]/50 hover:bg-[#1A1A1A] transition-all duration-300 text-xs font-mono tracking-wider text-[#F3F3F1]"
        aria-label="Select Currency"
      >
        <span className="text-[#C5A880] font-medium">{currency.symbol}</span>
        <span>{currency.code}</span>
        <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C5A880]' : 'text-gray-400'}`}></i>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-44 bg-[#121212] border border-[#2A2A2A] shadow-2xl py-1 z-50 max-h-64 overflow-y-auto backdrop-blur-xl">
            <div className="px-3 py-1.5 border-b border-[#222] text-[10px] uppercase font-mono tracking-widest-arch text-gray-400">
              Global Currency
            </div>
            {availableCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  currency.code === curr.code
                    ? 'bg-[#1C1C1C] text-[#C5A880] font-medium'
                    : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <span className="font-mono text-xs text-[#C5A880]">{curr.symbol}</span>
                <span className="font-sans font-medium">{curr.code}</span>
                {currency.code === curr.code && (
                  <i className="ri-check-line text-xs text-[#C5A880]"></i>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
