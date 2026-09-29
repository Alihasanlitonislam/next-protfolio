"use client";

import { useEffect, useRef } from "react";
import hoverEffect from "hover-effect";

type HoverItemProps = {
  image: string;
  displacement: string;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
  css?: string;
};

type HoverEffectInstance = {
  next: () => void;
  previous: () => void;
  destroy?: () => void;
};

export default function HoverItem({
  image,
  displacement,
  intensity = 0.25,
  speedIn = 1.2,
  speedOut = 1.4,
  css,
}: HoverItemProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const effectRef = useRef<HoverEffectInstance | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;

    if (!container || !img) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const initEffect = () => {
      effectRef.current = new hoverEffect({
        parent: container,
        intensity,
        speedIn,
        speedOut,
        image1: image,
        image2: image,
        displacementImage: displacement,
        imagesRatio: img.naturalHeight / img.naturalWidth,
        hover: false,
        easing: easeOutCubic,
      }) as HoverEffectInstance;
    };

    if (img.complete) initEffect();
    else img.addEventListener("load", initEffect);

    const onEnter = () => effectRef.current?.next();
    const onLeave = () => effectRef.current?.previous();

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      img.removeEventListener("load", initEffect);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      effectRef.current?.destroy?.();
      effectRef.current = null;
    };
  }, [image, displacement, intensity, speedIn, speedOut]);

  return (
    <div
      ref={containerRef}
      className={`zf--hover-img w-full h-full overflow-hidden ${
        css ? css : "rounded-full"
      }`}
    >
      <img
        ref={imgRef}
        src={image}
        alt=""
        className="hidden"
        draggable={false}
      />
    </div>
  );
}
