"use client";

import { useState } from "react";
import Image from "next/image";

interface CoinImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CoinImage({ src, alt, className }: CoinImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== "/img/coin/icon/default.png") {
      setImgSrc("/img/coin/icon/default.png");
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={100} // Adjust based on your needs
      height={100} // Adjust based on your needs
      priority={false} // Optional: for lazy loading
    />
  );
}