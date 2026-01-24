import React, { Suspense } from "react";
import { getCombinedData } from "@/components/NftCollectiondata"; 
import NFTRankingsTable from "@/components/NftComponents/NFTRankingsTable";
import NFTRankingsTableSkeleton from "@/components/NftComponents/NFTRankingsTableSkeleton";

async function RankingsContent() {
  // SSR: Fetch the first 20 items for fast initial load
  const initialData = await getCombinedData(0, 20);
  return <NFTRankingsTable initialData={initialData} />;
}

export default async function CollectionsStatsPage() {
  return (
    <div className="text-white max-w-[80%] mx-auto">
      <div className="h-[400px] bg-black flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">Top NFT Collection Prices</h1>
        <p className="text-xl text-gray-400">
          Explore top NFT collections by price floor, market cap, and total volume.
        </p>
      </div>
      {/* Render the table with Suspense fallback */}
      <Suspense fallback={<NFTRankingsTableSkeleton rows={5} />}>
        <RankingsContent />
      </Suspense>
    </div>
  );
}
