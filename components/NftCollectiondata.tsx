import { NFTData } from "@/types/coin";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key": process.env.OPENSEA_API_KEY || "",
  },
};

// Fetch all collections (OpenSea pagination is limited, so fetch a larger batch once)
export async function getCollectionsData(offset: number, limit: number) {
  // OpenSea's market_cap ordering doesn't paginate well, so fetch a larger batch (first 100)
  // and let the client handle pagination
  const batchSize = 100;
  const url = `https://api.opensea.io/api/v2/collections?chain=ethereum&order_by=market_cap&offset=0&limit=${batchSize}`;
  console.log(`[getCollectionsData] Fetching: ${url}`);
  
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Koleksiyon verisi çekilemedi");
  }

  const data = await res.json();
  const allCollections = data.collections || [];
  
  // Apply client-side pagination using offset and limit
  const paginatedCollections = allCollections.slice(offset, offset + limit);
  console.log(`[getCollectionsData] Total: ${allCollections.length}, Returned (offset=${offset}, limit=${limit}): ${paginatedCollections.length} collections. First: ${paginatedCollections[0]?.name}`);
  
  return paginatedCollections;
}

// Fetch stats for each specific collection
// Fetch stats for a collection using slug (preferred) or name as fallback
export async function getStatsData(collectionId: string) {
  const res = await fetch(
    `https://api.opensea.io/api/v2/collections/${collectionId}/stats`,
    options,
  );

  if (!res.ok) {
    throw new Error(`${collectionId} için stats verisi çekilemedi`);
  }

  return res.json();
}

// Fetch combined data (uncached for dynamic pagination)
export const getCombinedData = async (offset: number, limit: number) => {
  try {
    if (!process.env.OPENSEA_API_KEY) {
      throw new Error("OPENSEA_API_KEY is missing in environment");
    }
    const collections = await getCollectionsData(offset, limit);

    const statsPromises = collections.map(async (collection: NFTData & { slug?: string; collection?: string }) => {
      try {
        // Prefer slug for stats endpoint; fallback to name
        const id = collection.slug || collection.collection || collection.name;
        const stats = await getStatsData(id);
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

    // Don't sort - keep OpenSea's market_cap ordering for consistent pagination
    return combinedData;
  } catch (error) {
    console.error("Error during data combination:", error);
    throw new Error("Error combining data");
  }
};
