import { unstable_cache } from "next/cache";
import { NFTData } from "@/types/coin";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key": process.env.OPENSEA_API_KEY || "",
  },
};

// Fetch collections with offset and limit for pagination
export async function getCollectionsData(offset: number, limit: number) {
  const res = await fetch(
    `https://api.opensea.io/api/v2/collections?chain=ethereum&order_by=market_cap&offset=${offset}&limit=${limit}`,
    options,
  );

  if (!res.ok) {
    throw new Error("Koleksiyon verisi çekilemedi");
  }

  const data = await res.json();
  return data.collections;
}

// Fetch stats for each specific collection
export async function getStatsData(collectionName: string) {
  const res = await fetch(
    `https://api.opensea.io/api/v2/collections/${collectionName}/stats`,
    options,
  );

  if (!res.ok) {
    throw new Error(`${collectionName} için stats verisi çekilemedi`);
  }

  return res.json();
}

// Cached combined data fetching
export const getCombinedData = async (offset: number, limit: number) => {
  const cachedFetch = unstable_cache(
    async (offset, limit) => {
      try {
        const collections = await getCollectionsData(offset, limit);

        const statsPromises = collections.map(async (collection: NFTData) => {
          try {
            const stats = await getStatsData(collection.name);
            return { collection, stats };
          } catch (error) {
            console.error(`Failed to fetch stats for ${collection.name}:`, error);
            // Fallback to returning collection with null stats
            return { collection, stats: null };
          }
        });

        const combinedData = await Promise.all(statsPromises);

        // Ensure there's data to sort, else throw an error
        if (!combinedData || combinedData.length === 0) {
          throw new Error("No combined data available after fetching.");
        }

        combinedData.sort((a, b) => (b.stats?.total?.volume || 0) - (a.stats?.total?.volume || 0));
        return combinedData;
      } catch (error) {
        console.error("Error during data combination:", error);
        throw new Error("Error combining data"); // Triggers 500 response
      }
    },
    [`combined-data-${offset}-${limit}`],
    { revalidate: 3600 },
  );

  return cachedFetch(offset, limit);
};
