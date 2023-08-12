import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2  animate-pulse">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
