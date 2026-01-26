"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";
import { UseAuthContext } from "@/hooks/UseAuthContext";
import logo from "@/public/images/Group.svg";

const navLinks = [
  { name: 'Markets', href: '/markets' },
  { name: 'News', href: '/news' },
  { name: 'Learn', href: '/learn' },
  { name: 'Support', href: '/support' },
  { name: 'NFTs', href: '/nftrankings' },
];

const Navbar = () => {
  const { state } = UseAuthContext(); // Extract state from context
  const { user } = state; // Extract user from state

  return (
    <div>
      <div className="bg-[#0d131d] h-16 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex  items-center ">
                <Image
                  src={logo}
                  alt="Picture of the logo"
                  priority
                  style={{ width: "30px", height: "auto" }}
                />

                <span className=" text-textPrimary  text-center text-xl font-semibold pl-2 mt-1">
                  COLD
                </span>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* //buttons */}

          {!user && (
            <div className="flex gap-4">
              <button
                className="text-button-Text bg-button-Primary    hover:bg-button-Hover hover:border-b-button-HoverSecondary
             border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold"
              >
                <Link href="/signup">signup</Link>
              </button>
              <button
                className="text-button-Text  bg-button-Primary   hover:bg-button-Hover hover:border-b-button-HoverSecondary
             border-b-4 rounded-md border-b-button-Secondary  px-6 py-1.5 text-xs font-semibold"
              >
                <Link href="/login">Login</Link>
              </button>
            </div>
          )}
          {/* LOGUT */}
          <div className="flex gap-4">
            {user ? (
              <>
                <span className="text-textPrimary mt-1">{user.email}</span>
                <LogoutButton />
              </>
            ) : (
              <span className="text-textPrimary mt-1">User not logged in</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
