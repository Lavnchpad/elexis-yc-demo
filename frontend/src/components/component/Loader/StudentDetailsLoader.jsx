import React from "react";
import { Skeleton } from "../../ui/skeleton";

const StudentDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Skeleton Profile Header */}
      <div className="bg-white p-6 rounded shadow mb-6 flex items-center">
        <div className="flex items-center space-x-6">
          {/* Avatar Skeleton */}
          <Skeleton className="w-40 h-40 rounded-full" />

          {/* Text Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="ml-auto flex space-x-4">
          <Skeleton className="h-10 w-20 rounded" />
          <Skeleton className="h-10 w-20 rounded" />
          <Skeleton className="h-10 w-20 rounded" />
        </div>
      </div>

      {/* Skeleton Tabs Section */}
      <div className="w-full px-6 py-4 bg-muted/30">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="p-4 bg-background rounded-lg">
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsSkeleton;
