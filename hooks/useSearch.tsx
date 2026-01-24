// hooks/useSearch.ts
import { useState, useEffect } from "react";
import { NFTData } from "@/types/coin";

export default function useSearch(initialNfts: NFTData[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNfts, setFilteredNfts] = useState<NFTData[]>(initialNfts);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = initialNfts.filter((nft) =>
        nft.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredNfts(filtered);
    } else {
      setFilteredNfts(initialNfts);
    }
  }, [searchQuery, initialNfts]);

  return {
    filteredNfts,
    searchQuery,
    setSearchQuery,
  };
}
