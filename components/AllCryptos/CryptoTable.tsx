'use client';

import { useEffect, useState } from 'react';
import CryptoRow from './CryptoRow';
import PurpleSnakeAnimation from './PurpleSnakeAnimation';
import { cachedFetch } from '@/lib/apiCache';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

export default function CryptoTable() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await cachedFetch(
          '/api/coingecko/markets?vs_currency=usd&order=market_cap_desc&per_page=25&sparkline=false',
          {},
          120000 // 2 min cache
        );
        
        setCryptos(data);
      } catch (error) {
        console.error('Failed to fetch cryptos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(symbol)) {
        newSet.delete(symbol);
      } else {
        newSet.add(symbol);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-800 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <PurpleSnakeAnimation>
      <div className="rounded-xl border border-gray-900 bg-gray-950 overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between py-4 border-b border-gray-800 px-6 mb-2 bg-gray-900">
          <div className="flex-1 text-xs uppercase tracking-wide text-gray-500 font-medium">Name</div>
          <div className="flex-1 text-right text-xs uppercase tracking-wide text-gray-500 font-medium">Price</div>
          <div className="flex-1 text-right text-xs uppercase tracking-wide text-gray-500 font-medium">24h Change</div>
          <div className="flex-1 text-right text-xs uppercase tracking-wide text-gray-500 font-medium">24h Volume</div>
          <div className="flex-1 text-right text-xs uppercase tracking-wide text-gray-500 font-medium">Market Cap</div>
        </div>

        {/* Table Rows */}
        <div className="px-6">
          {cryptos.map((crypto) => (
            <CryptoRow
              key={crypto.id}
              id={crypto.id}
              symbol={crypto.symbol}
              name={crypto.name}
              image={crypto.image}
              price={crypto.current_price}
              change24h={crypto.price_change_percentage_24h}
              volume24h={crypto.total_volume}
              marketCap={crypto.market_cap}
              isFavorite={favorites.has(crypto.symbol)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </PurpleSnakeAnimation>
  );
}
