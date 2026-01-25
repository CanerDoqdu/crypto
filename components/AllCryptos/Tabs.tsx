'use client';

import { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex gap-8 border-b border-gray-900 py-4">
      <button
        onClick={() => setActiveTab('favorites')}
        className={`text-sm font-medium transition pb-2 border-b-2 ${
          activeTab === 'favorites'
            ? 'text-white border-b-white'
            : 'text-gray-400 border-b-transparent hover:text-gray-300'
        }`}
      >
        Favorites
      </button>
      <button
        onClick={() => setActiveTab('all')}
        className={`text-sm font-medium transition pb-2 border-b-2 ${
          activeTab === 'all'
            ? 'text-white border-b-white'
            : 'text-gray-400 border-b-transparent hover:text-gray-300'
        }`}
      >
        All cryptos
      </button>
    </div>
  );
}
