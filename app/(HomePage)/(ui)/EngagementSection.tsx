// components/ClaimYourSpotSection.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import usersImage from "@/public/images/debate.png";
import offersImage from "@/public/images/fireside.png";
import trackImage from "@/public/images/andreas.png";

const ClaimYourSpotSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:items-start lg:gap-16">
          {/* Left Side - Content Wrapper */}
          <div className="flex-1 lg:sticky lg:top-24 pt-[5%] pb-[5%]">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
              Join The Community
            </span>
            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Claim Your Spot <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                in Crypto
              </span>
            </h3>
            <p className="mt-6 text-lg text-gray-400 max-w-md leading-relaxed">
              Join the revolution and start earning rewards by becoming part of
              our crypto community today. Get exclusive access to insights, tips, and community events.
            </p>
            <div className="flex gap-4 mt-8">
              <Link 
                href="/signup"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105"
              >
                Get Started
              </Link>
              <button className="border border-gray-700 hover:border-emerald-500/50 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-emerald-900/20">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-white">20M+</p>
                <p className="text-gray-500 text-sm">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">300+</p>
                <p className="text-gray-500 text-sm">Crypto Offers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-gray-500 text-sm">Support</p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image Gallery */}
          <div className="grid grid-cols-1 gap-8 mt-12 lg:mt-0 lg:grid-cols-1 flex-1">
            <div className="group w-full flex justify-end">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                <Image
                  src={usersImage}
                  loading="lazy"
                  alt="20 Million Users"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">Community Debates</p>
                  <p className="text-gray-300 text-sm">Join the conversation</p>
                </div>
              </div>
            </div>
            <div className="group w-full flex justify-end">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                <Image
                  src={offersImage}
                  loading="lazy"
                  alt="300 Plus Offers"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">Fireside Chats</p>
                  <p className="text-gray-300 text-sm">Learn from experts</p>
                </div>
              </div>
            </div>
            <div className="group w-full flex justify-end">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                <Image
                  src={trackImage}
                  loading="lazy"
                  alt="From Track to Webb"
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">Expert Insights</p>
                  <p className="text-gray-300 text-sm">From industry leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimYourSpotSection;
