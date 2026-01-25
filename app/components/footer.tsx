import React from "react";
import Image from "next/image";
import Link from "next/link";
import youtube from "@/public/images/youtube.png";
import instagram from "@/public/images/instagram.png";
import reddit from "@/public/images/reddit.png";
import t from "@/public/images/t.png";
import facebook from "@/public/images/facebook.png";
import coldlogo from "@/public/images/coldlogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description Section */}
          <div className="w-full md:w-1/4 mb-6">
            <div className="flex  items-center">
              <Image src={coldlogo} alt="coldlogo" />
              <div className="text-white text-2xl font-bold ">COLD</div>
            </div>
            <p className="mb-4">Take your crypto trading to the <br/> <span className=" ml-14 font-semibold text-white"> NEXT LEVEL</span></p>

            <div className="grid w-3/6">
              <button className="bg-emerald-500 text-black font-bold py-2 rounded-lg mb-2 hover:bg-emerald-400 transition">
                Create Account
              </button>
              <button className="bg-transparent text-white px-4 py-2 border border-gray-600 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-900/20 transition">
                Sign in
              </button>
            </div>
          </div>

          {/* Supports Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-white font-semibold mb-4">Supports</h4>
            <ul>
              <li>NFT Marketplace</li>
              <li>Margin Trading</li>
              <li>Futures Trading</li>
              <li>OTC Trading</li>
              <li>Institutions API</li>
              <li>Trading Staking</li>
              <li>Rewards All Features</li>
            </ul>
          </div>

          {/* Browse Prices Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-white font-semibold mb-4">Browse Prices</h4>
            <ul>
              <li>BTC to USD</li>
              <li>ETH to USD</li>
              <li>DOGE to USD</li>
              <li>XRP to USD</li>
              <li>ADA to USD</li>
              <li>SOL to USD</li>
              <li>LTC to USD</li>
            </ul>
          </div>

          {/* Popular Markets Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-white font-semibold mb-4">Popular Markets</h4>
            <ul>
              <li>BTC to USD</li>
              <li>ETH to USD</li>
              <li>DOGE to USD</li>
              <li>XRP to USD</li>
              <li>ADA to USD</li>
              <li>SOL to USD</li>
              <li>LTC to USD</li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <div className="flex space-x-4">
              <Link href="https://www.youtube.com/watch?v=-mD_nqa2KJU" passHref>
                <Image
                  src={youtube}
                  alt="NFT"
                  className="rounded-lg object-cover"
                />
              </Link>

              <Link href="https://www.youtube.com/watch?v=-mD_nqa2KJU" passHref>
                <Image
                  src={instagram}
                  alt="NFT"
                  className="rounded-lg object-cover"
                />
              </Link>
              <Link href="https://www.youtube.com/watch?v=-mD_nqa2KJU" passHref>
                <Image
                  src={reddit}
                  alt="NFT"
                  className="rounded-lg object-cover"
                />
              </Link>
              <Link href="https://www.youtube.com/watch?v=-mD_nqa2KJU" passHref>
                <Image src={t} alt="NFT" className="rounded-lg object-cover" />
              </Link>
              <Link href="https://www.youtube.com/watch?v=-mD_nqa2KJU" passHref>
                <Image
                  src={facebook}
                  alt="NFT"
                  className="rounded-lg object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
