// app/[slug]/page.tsx
import Image from "next/image";
import {
  getCollectionItems,
  getCollectionStats,
  getNFTs,
  getDescription,
  getBestOfferForNFT,
} from "@/components/NFtCollectionSolo";
import ExpandableText from "@/hooks/useLineClamp";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import NFTGridWrapper from "@/components/NftComponents/NFTGridWrapper";

interface Params {
  slug: string;
}

interface SearchParams {
  search?: string;
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug;

  try {
    const collection = await getCollectionItems(slug);
    const stats = await getCollectionStats(slug);
    const nfts = await getNFTs(slug);
    const description = await getDescription(slug); // Fetch description here

    if (!collection || !nfts || nfts.length === 0) {
      return (
        <div className="text-red-500">No data found for collection: {slug}</div>
      );
    }

    // Use a default value for search query to avoid undefined error
    const searchQuery = resolvedSearchParams.search || ""; // Fallback to empty string if undefined
    const offers = await Promise.all(
      nfts.map(async (nft) => ({
        identifier: nft.identifier,
        offer: await getBestOfferForNFT(slug, nft.identifier),
      }))
    );
    const offersMap = Object.fromEntries(
      offers.map(({ identifier, offer }) => [identifier, offer])
    );
    // NFT'leri filtrele
    const filteredNfts = searchQuery
      ? nfts.filter((nft) => {
          const lowerQuery = searchQuery.toLowerCase();
          return (
            nft.name.toLowerCase().includes(lowerQuery) ||
            (nft.traits &&
              nft.traits.some((trait) =>
                trait.value.toLowerCase().includes(lowerQuery),
              ))
          );
        })
      : nfts;

    return (
      <div className="relative min-h-screen bg-black text-white">
        {(collection.banner_image_url || collection.image_url) && (
          <div className="relative h-[400px] w-full mb-8">
            {collection.banner_image_url &&
            (collection.banner_image_url.endsWith(".mp4") ||
              collection.banner_image_url.endsWith(".webm")) ? (
              <video
                src={collection.banner_image_url}
                autoPlay
                loop
                muted
                className="object-cover w-full h-full opacity-80"
              />
            ) : (
              <Image
                src={collection.banner_image_url.replace(/w=\d+/, "w=1920")}
                alt="Banner Image"
                fill
                className="object-cover opacity-80"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center p-6 z-10">
              <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
                <div className="items-center">
                  <Image
                    src={collection.image_url || "/placeholder.png"}
                    alt={collection.name || "Unnamed Collection"}
                    width={110}
                    height={110}
                    className="border border-gray-600 rounded-lg"
                  />
                  <div className="flex items-center mt-6">
                    <h1 className="text-4xl font-bold">
                      {collection.name || "Unnamed Collection"}
                    </h1>
                    {collection.safelist_status === "verified" && (
                      <CheckBadgeIcon
                        className="w-8 h-8 text-blue-500 inline-block ml-2"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 text-center text-gray-300">
                  <div>
                    <p className="text-lg">
                      {stats?.total?.volume
                        ? stats.total.volume.toFixed(2)
                        : "-"}{" "}
                      {stats?.total?.floor_price_symbol || "ETH"}
                    </p>
                    <p className="text-sm">Total Volume</p>
                  </div>
                  <div>
                    <p className="text-lg">
                      {stats?.total?.floor_price
                        ? stats.total.floor_price.toFixed(2)
                        : "-"}{" "}
                      {stats?.total?.floor_price_symbol || "ETH"}
                    </p>
                    <p className="text-sm">Floor Price</p>
                  </div>
                  <div>
                    <p className="text-lg">
                      {stats?.total?.average_price
                        ? stats.total.average_price.toFixed(4)
                        : "-"}{" "}
                      ETH
                    </p>
                    <p className="text-sm">Average Price</p>
                  </div>
                  <div>
                    <p className="text-lg">{stats?.total?.num_owners || "-"}</p>
                    <p className="text-sm">Owners</p>
                  </div>
                  <div>
                    <p className="text-lg">{stats?.total?.sales || "-"}</p>
                    <p className="text-sm">Sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar Form */}
        <div className="max-w-screen-xl mx-auto mb-4">
          <form action="" method="get">
            <input
              type="text"
              name="search"
              placeholder="Search by name or trait"
              defaultValue={searchQuery} // Set the initial value from the URL parameter
              className="p-2 rounded bg-gray-800 text-gray-300"
            />
            <button
              type="submit"
              className="ml-2 p-2 rounded bg-blue-600 text-white"
            >
              Search
            </button>
          </form>
        </div>

        {/* Render ExpandableText with the fetched description */}
        <div className="max-w-screen-xl mx-auto mb-8">
          <div className="mt-8 flex ">
            <ExpandableText description={description} />
          </div>
        </div>

        {/* Use NFTGridWrapper for grid display */}
        <div className="max-w-screen-xl mx-auto ">
          <NFTGridWrapper slug={slug} initialNfts={filteredNfts}  offers={offersMap} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return <div className="text-red-500">Error loading collection data.</div>;
  }
}
