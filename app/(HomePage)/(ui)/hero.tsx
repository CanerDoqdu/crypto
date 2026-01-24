import React from "react";
import { getCryptoPrices } from "@/components/Coingeckoapi";
import { fetchgeneralinfo, CoinInfo } from "@/components/CryptoGeneralInfo";
import {
  fetchCryptoChange,
  CryptoChanges,
} from "@/components/Crypto24HourChange";
import { fetchNews, NewsArticle } from "@/components/CryptoNews";
import { fetchNftInfo, NftInfo } from "@/components/Nfts";
import TypedAnimation from "@/components/TypedAnimation";
import CryptoPriceUpdater from "@/components/CryptoPrices";
import { WebSocketProvider } from "@/components/WebSocketContext";
import Image from "next/image";
import Link from "next/link";
import RedditSection from '@/components/redditapi/RedditSection'

const Hero = async () => {
  const coinSymbols = ["BTC", "ETH", "SOL"];


  // Fetch all data simultaneously
  const [coinInfos, initialPrices, cryptoChanges, newsArticles, nftInfos] =
    await Promise.all([
      fetchgeneralinfo(coinSymbols),
      getCryptoPrices(),
      fetchCryptoChange(),
      fetchNews(),
      fetchNftInfo(),
    ]);

  // Filter out NFTs with missing or non-renderable images to avoid broken thumbnails
  const filteredNfts = nftInfos.filter((nft) => {
    if (!nft.image_url) return false;
    const url = nft.image_url.toLowerCase();
    const hasValidExt = /(\.png|\.jpg|\.jpeg|\.webp)$/i.test(url);
    const isHttp = url.startsWith("http://") || url.startsWith("https://");
    return hasValidExt && isHttp;
  });

  const nftFallbackImg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%2318202c'/%3E%3Ctext x='50%25' y='50%25' fill='%235f708a' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle'%3ENFT%3C/text%3E%3C/svg%3E";

  // Shuffle to present random NFTs on each request and cap to 20 items for layout stability
  const shuffled = [...filteredNfts];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const displayNfts = shuffled.slice(0, 20);
  return (
    <WebSocketProvider>
      <section className="flex justify-between h-lvh  text-white bg-black">
        <div className="w-full flex justify-between max-w-section mx-auto ">
          <div className="pt-[90px] w-full">
            <p className="text-[64px]">Earn with Crypto</p>
            <p className=" min-h-24">
              <TypedAnimation />
            </p>
            <p className="text-lg font-semibold">
              Start Today And Begin Earning Rewards Up To
            </p>
            <p className="text-xl font-bold">500 USDT</p>
            <div className="flex gap-4 mt-12">
              <input
                type="text"
                placeholder="Email/Phone number"
                className="w-[300px] h-[40px] rounded-[10px] border-2 border-[#549366] placeholder-gray-500 bg-[#000000] px-4"
              />
              <button className="text-button-Text bg-[#dbddda] hover:bg-button-Hover hover:border-b-button-HoverSecondary border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold">
                Sign Up
              </button>
            </div>
            <div>
     
      {/* RedditSection bileşenini kullanıyoruz */}
      <RedditSection />
    </div>
          </div>

          <div className="flex flex-col">
            <div className="w-[542px] h-[200px] rounded-[20px] bg-[#0d131d] mt-12">
              <div className="flex justify-between mx-6 my-5">
                <p className="text-[16px]">Trending</p>
                 <Link
                    href={{
                      pathname: "/allcryptolistings",
                    }}
                  >
                    View All Coins
                  </Link>
              </div>
              <div>
                {coinSymbols.map((coinSymbol, index) => {
                  const coinInfo = coinInfos.find(
                    (info) => info.Name === coinSymbol,
                  );
                  const price = initialPrices[coinSymbol];
                  const change = cryptoChanges[coinSymbol];

                  return (
                    <div key={coinSymbol} className="flex items-center mx-6 my-3">
                      <img
                        src={coinInfo?.ImageUrl}
                        alt={coinInfo?.Name}
                        className="w-7 h-7 mr-1"
                      />
                      <div className="flex flex-grow gap-1 items-end">
                        <h3 className="text-sm font-semibold">
                          {coinInfo?.Name}
                        </h3>
                        <p className="text-xs">{coinInfo?.FullName}</p>
                      </div>
                      <div className="flex gap-3 items-baseline">
                        <CryptoPriceUpdater
                          coin={coinSymbol}
                          initialPrice={price}
                        />
                        <p
                          className={`text-sm ${
                            parseFloat(change) > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {change}%
                        </p>
                      </div>
                    </div>
                  );
                })}
                
              </div>
            </div>

            {/* News Section */}
            <div className="text-sm w-[542px] h-[181px] rounded-[20px] bg-[#0d131d] mt-10">
              <div className="pt-4 pl-6">
                <p className="mb-4 text-[16px] font-bold">News</p>
                {newsArticles.map((article, index) => (
                  <div key={index}>
                    <p>{article.title}</p>
                    {index < newsArticles.length - 1 && <br />}
                  </div>
                ))}
              </div>
            </div>

            {/* NFT Section - seamless horizontal slider */}
            <div className="text-sm w-[542px] rounded-[20px] bg-[#0d131d] mt-10 overflow-hidden relative">
              <div className="flex items-center pt-4 pl-6 h-12">
                <p>NFT's</p>
              </div>

              <div className="relative overflow-hidden mx-7">
                <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0d131d] to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0d131d] to-transparent pointer-events-none z-10" />

                {displayNfts.length === 0 ? (
                  <div className="pl-6 pb-4">
                    <p className="text-gray-400 text-xs">No NFT thumbnails available right now.</p>
                  </div>
                ) : (
                  <div className="nft-scroller" data-animated="true">
                    <div className="nft-track pl-6">
                      {[...displayNfts, ...displayNfts].map((nft, i) => (
                        <div key={`${nft.name}-${i}`} className="nft-item">
                          <Image
                            src={nft.image_url || nftFallbackImg}
                            alt={nft.name}
                            width={65}
                            height={65}
                            className="nft-img"
                            quality={60}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={nftFallbackImg}
                          />
                          <p className="nft-name">{nft.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 pl-6 pb-4">
                <Link
                  href={{
                    pathname: "/nftrankings",
                  }}
                >
                  View All NFTs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebSocketProvider>
  );
};

export default Hero;
