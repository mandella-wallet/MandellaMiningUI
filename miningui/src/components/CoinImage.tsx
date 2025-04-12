"use client"; // Mark this as a Client Component

import { useState } from "react";

interface CoinImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CoinImage({ src, alt, className }: CoinImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("/img/coin/icon/default.png");
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}