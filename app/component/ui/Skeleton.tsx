import React from "react";

interface SkeletonProps {
  width: string | number;
  height: string | number;
  borderRadius: string | number;
}

const Skeleton = ({ width, height, borderRadius }: SkeletonProps) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
