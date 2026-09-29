"use client";

import { useEffect, type MutableRefObject } from "react";
import AOS from "aos";

export default function useBottomToTopAnimation(
  itemsRef: MutableRefObject<(HTMLElement | null)[]>
) {
  useEffect(() => {
    const items = itemsRef.current.filter(
      (item): item is HTMLElement => item !== null
    );

    if (!items.length) return;

    items.forEach((item, index) => {
      item.setAttribute("data-aos", "fade-up");
      item.setAttribute("data-aos-duration", "700");
      item.setAttribute("data-aos-delay", `${index * 80}`);
    });

    AOS.refresh();
  }, [itemsRef]);
}
