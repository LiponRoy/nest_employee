// components/SkeletonLoader.tsx
import React from "react";

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-48 w-full rounded-md bg-gray-300 animate-pulse"
        />
      ))}
    </>
  );
};
