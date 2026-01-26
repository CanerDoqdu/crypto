'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import NeonSnakeAnimation from '@/components/NftComponents/NeonSnakeAnimation';

interface NFTCollection {
  id?: string;
  name: string;
  image?: string;
  chain?: string;
  floorPrice?: number;
  floorPriceToken?: string;
  priceChange24h?: number;
  volume24h?: number;
  marketCap?: number;
  rank?: number;
  _id?: string;
}

interface CombinedNFTData {
  collection: any;
  stats: any;
}

interface NFTRankingsTableProps {
  initialData: (NFTCollection | CombinedNFTData)[];
}

export default function NFTRankingsTable({ initialData }: NFTRankingsTableProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const nextOffset = data.length;
      const res = await fetch(`/api/nft-rankings?offset=${nextOffset}&limit=20`);
      if (!res.ok) throw new Error('Failed to fetch');
      const moreData = await res.json();
      
      if (moreData.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...moreData]);
      }
    } catch (error) {
      console.error('Failed to load more NFTs:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return '-';
    if (price >= 1000000000) return `$${(price / 1000000000).toFixed(2)}B`;
    if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(2)}K`;
    return `$${price.toFixed(2)}`;
  };

  const formatFloorPrice = (price?: number) => {
    if (!price) return '-';
    return price.toFixed(2);
  };

  const getChangeColor = (change?: number) => {
    if (!change) return 'text-gray-300';
    return change >= 0 ? 'text-emerald-400' : 'text-red-400';
  };

  const getChainBadgeColor = (chain?: string) => {
    const chainLower = chain?.toLowerCase() || '';
    if (chainLower.includes('ethereum') || chainLower.includes('eth')) return 'bg-blue-500/20 text-blue-300';
    if (chainLower.includes('solana') || chainLower.includes('sol')) return 'bg-purple-500/20 text-purple-300';
    if (chainLower.includes('polygon')) return 'bg-pink-500/20 text-pink-300';
    if (chainLower.includes('optimism')) return 'bg-red-500/20 text-red-300';
    if (chainLower.includes('arbitrum')) return 'bg-cyan-500/20 text-cyan-300';
    return 'bg-gray-500/20 text-gray-300';
  };

  return (
    <NeonSnakeAnimation>
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden lg:grid gap-4 px-6 py-4 border-b border-gray-700/30" style={{ gridTemplateColumns: '60px 30px 1fr 140px 110px 140px 140px' }}>
          <div className="text-xs font-semibold text-gray-400 uppercase">Rank</div>
        <div></div>
        <div className="text-xs font-semibold text-gray-400 uppercase">Collection</div>
        <div className="text-xs font-semibold text-gray-400 uppercase text-right">Floor Price</div>
        <div className="text-xs font-semibold text-gray-400 uppercase text-right">24h Change</div>
        <div className="text-xs font-semibold text-gray-400 uppercase text-right">24h Volume</div>
        <div className="text-xs font-semibold text-gray-400 uppercase text-right">Market Cap</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {data.map((item, index) => {
          // Handle both combined data and plain collection formats
          const itemData = (item as CombinedNFTData).collection ? (item as CombinedNFTData) : { collection: item, stats: null };
          const collection = itemData.collection;
          const stats = itemData.stats;

          const collectionId = collection._id || collection.id || `${collection.name}-${index}`;
          const isFavorite = favorites.has(collectionId);

          // Extract data from OpenSea format
          const name = collection.name;
          const image = collection.image_url || collection.image;
          const slug = collection.collection || collection.slug || collectionId;
          const oneDay = stats?.intervals?.find((i: any) => i.interval === 'one_day');
          const sevenDay = stats?.intervals?.find((i: any) => i.interval === 'seven_day');
          const floorPrice = stats?.total?.floor_price ?? collection.floorPrice;
          const volume24h = (oneDay?.volume ?? collection.volume24h) ?? stats?.total?.volume;
          const marketCap = stats?.total?.market_cap ?? collection.marketCap;
          const priceChange = (sevenDay?.average_price && oneDay?.average_price)
            ? ((oneDay.average_price - sevenDay.average_price) / sevenDay.average_price) * 100
            : collection.priceChange24h;

          return (
            <Link
              key={`nft-${index}-${collectionId}`}
              href={`/nftrankings/${slug}`}
              className="block"
            >
              <div
                data-nft-row
                className="hidden lg:grid gap-4 px-6 py-4 bg-gray-900/10 hover:bg-gray-900/30 transition-colors rounded-lg border border-gray-700/10 cursor-pointer hover:border-emerald-500/30"
                style={{ gridTemplateColumns: '60px 30px 1fr 140px 110px 140px 140px' }}
              >
              {/* Rank - using global position in data array */}
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-400">#{index + 1}</span>
              </div>

              {/* Star Icon */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => toggleFavorite(collectionId)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  title="Add to favorites"
                >
                  {isFavorite ? (
                    <StarIconSolid className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <StarIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Collection Info */}
              <div className="flex items-center gap-3">
                {image && (
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-700">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{name}</p>
                  {collection.chain && (
                    <span className={`text-xs px-2 py-0.5 rounded inline-block ${getChainBadgeColor(collection.chain)}`}>
                      {collection.chain}
                    </span>
                  )}
                </div>
              </div>

              {/* Floor Price */}
              <div className="flex flex-col items-end justify-center">
                <p className="text-sm font-semibold text-white">
                  {formatFloorPrice(floorPrice)} ETH
                </p>
                <p className="text-xs text-gray-400">
                  {floorPrice ? formatPrice(floorPrice * 3000) : '-'}
                </p>
              </div>

              {/* 24h Change */}
              <div className={`flex items-center justify-end text-sm font-semibold ${getChangeColor(priceChange)}`}>
                {priceChange !== undefined ? (
                  <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </div>

              {/* 24h Volume */}
              <div className="flex items-center justify-end text-sm text-white font-semibold">
                {formatPrice(volume24h)}
              </div>

              {/* Market Cap */}
              <div className="flex items-center justify-end text-sm text-white font-semibold">
                {formatPrice(marketCap)}
              </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.map((item, index) => {
          const data = (item as CombinedNFTData).collection ? (item as CombinedNFTData) : { collection: item, stats: null };
          const collection = data.collection;
          const stats = data.stats;

          const collectionId = collection._id || collection.id || `${collection.name}-${index}`;
          const isFavorite = favorites.has(collectionId);

          const name = collection.name;
          const image = collection.image_url || collection.image;
          const slug = collection.collection || collection.slug || collectionId;
          const floorPrice = stats?.floor_price || collection.floorPrice;
          const volume24h = stats?.total?.volume || collection.volume24h;
          const marketCap = stats?.market_cap || collection.marketCap;
          const priceChange = stats?.floor_price_change || collection.priceChange24h;

          return (
            <Link
              key={`nft-mobile-${index}-${collectionId}`}
              href={`/nftrankings/${slug}`}
              className="block"
            >
              <div
                className="bg-gray-900/20 border border-gray-700/20 rounded-lg p-4 hover:bg-gray-900/40 transition-colors cursor-pointer hover:border-emerald-500/30"
              >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {image && (
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-700">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">#{index + 1} {name}</p>
                    {collection.chain && (
                      <span className={`text-xs px-2 py-0.5 rounded inline-block ${getChainBadgeColor(collection.chain)}`}>
                        {collection.chain}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(collectionId)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0"
                >
                  {isFavorite ? (
                    <StarIconSolid className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <StarIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Floor Price</p>
                  <p className="text-white font-semibold">{formatFloorPrice(floorPrice)} ETH</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">24h Change</p>
                  <p className={`font-semibold ${getChangeColor(priceChange)}`}>
                    {priceChange !== undefined ? `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%` : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">24h Volume</p>
                  <p className="text-white font-semibold">{formatPrice(volume24h)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Market Cap</p>
                  <p className="text-white font-semibold">{formatPrice(marketCap)}</p>
                </div>
              </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="group relative px-6 py-2 bg-button-Primary hover:bg-button-Hover text-button-Text font-semibold rounded-md border-b-2 border-b-button-Secondary hover:border-b-button-HoverSecondary transition-all duration-200 disabled:bg-gray-600 disabled:border-b-gray-600 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More NFTs</span>
                <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No NFT collections found</p>
        </div>
      )}
      </div>
    </NeonSnakeAnimation>
  );
}
