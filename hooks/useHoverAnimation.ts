"use client";

import { useEffect } from "react";
import AOS from "aos";

type Props = {
  titleRef: React.RefObject<HTMLElement | null>;
  descriptionRef: React.RefObject<HTMLElement | null>;
};

export default function useHoverAnimation({
  titleRef,
  descriptionRef,
}: Props) {
  useEffect(() => {
    const title = titleRef.current;
    const description = descriptionRef.current;

    if (!title && !description) return;

    if (title) {
      title.setAttribute("data-aos", "fade-up");
      title.setAttribute("data-aos-duration", "600");
    }

    if (description) {
      description.setAttribute("data-aos", "fade-up");
      description.setAttribute("data-aos-duration", "600");
      description.setAttribute("data-aos-delay", "120");
    }

    AOS.refresh();
  }, [titleRef, descriptionRef]);
}
