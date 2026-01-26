import React from "react";
import Image from "next/image";
import Link from "next/link";
import youtube from "@/public/images/youtube.png";
import instagram from "@/public/images/instagram.png";
import reddit from "@/public/images/reddit.png";
import t from "@/public/images/t.png";
import facebook from "@/public/images/facebook.png";
import logo from "@/public/images/Group.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description Section */}
          <div className="w-full md:w-1/4 mb-8">
            <Link href="/">
              <div className="flex items-center mb-4">
                <Image
                  src={logo}
                  alt="Cold Logo"
                  priority
                  style={{ width: "30px", height: "auto" }}
                />
                <span className="text-white text-xl font-semibold pl-2 mt-1">
                  COLD
                </span>
              </div>
            </Link>
            <p className="text-sm mb-6">Take your crypto trading to the <br/> <span className="font-semibold text-emerald-400">NEXT LEVEL</span></p>

            <div className="flex flex-col gap-3 w-full sm:w-3/4">
              <Link href="/signup">
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30">
                  Create Account
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full bg-transparent text-white py-2.5 border border-gray-700 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all duration-200">
                  Sign in
                </button>
              </Link>
            </div>
          </div>

          {/* Supports Section */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Supports</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">NFT Marketplace</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Margin Trading</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Futures Trading</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">OTC Trading</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Institutions API</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Trading Staking</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Rewards</li>
            </ul>
          </div>

          {/* Browse Prices Section */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Browse Prices</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">BTC to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">ETH to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">DOGE to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">XRP to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">ADA to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">SOL to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">LTC to USD</li>
            </ul>
          </div>

          {/* Popular Markets Section */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Markets</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">BTC to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">ETH to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">DOGE to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">XRP to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">ADA to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">SOL to USD</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">LTC to USD</li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-8">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h4>
            <div className="flex space-x-3">
              <Link href="https://www.youtube.com" passHref className="hover:opacity-80 transition-opacity">
                <Image
                  src={youtube}
                  alt="YouTube"
                  className="rounded-lg object-cover w-8 h-8"
                />
              </Link>
              <Link href="https://www.instagram.com" passHref className="hover:opacity-80 transition-opacity">
                <Image
                  src={instagram}
                  alt="Instagram"
                  className="rounded-lg object-cover w-8 h-8"
                />
              </Link>
              <Link href="https://www.reddit.com" passHref className="hover:opacity-80 transition-opacity">
                <Image
                  src={reddit}
                  alt="Reddit"
                  className="rounded-lg object-cover w-8 h-8"
                />
              </Link>
              <Link href="https://twitter.com" passHref className="hover:opacity-80 transition-opacity">
                <Image src={t} alt="Twitter" className="rounded-lg object-cover w-8 h-8" />
              </Link>
              <Link href="https://www.facebook.com" passHref className="hover:opacity-80 transition-opacity">
                <Image
                  src={facebook}
                  alt="Facebook"
                  className="rounded-lg object-cover w-8 h-8"
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 COLD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
