"use client";

import { useEffect, useState } from "react";
import { IMAGE_FALLBACK } from "@/lib/demo-data";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

/** Native img — reliable for Unsplash CDN; swaps to verified fallback on error. */
export function SafeImage({ src, alt, className, fill, priority }: SafeImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  const resolvedClass = fill
    ? `absolute inset-0 h-full w-full object-cover ${className ?? ""}`
    : className ?? "h-full w-full object-cover";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={activeSrc}
      alt={alt}
      className={resolvedClass}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (activeSrc !== IMAGE_FALLBACK) setActiveSrc(IMAGE_FALLBACK);
      }}
    />
  );
}
