"use client";

import { useEffect } from "react";

export default function NftScroller() {
  useEffect(() => {
    const scrollers = document.querySelectorAll<HTMLDivElement>(".nft-scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {
        if (!scroller.hasAttribute("data-animated")) {
          scroller.setAttribute("data-animated", "true");
          
          const scrollerInner = scroller.querySelector<HTMLDivElement>(".nft-scroller__inner");
          if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children);
            
            // Clone each item
            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true) as HTMLElement;
              duplicatedItem.setAttribute("aria-hidden", "true");
              scrollerInner.appendChild(duplicatedItem);
            });
          }
        }
      });
    }
  }, []);

  return null;
}
