import React from 'react';
import { Skeleton } from "../../ui/skeleton"; 

const CandidateLoader = () => {
  return (
    <ul className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="flex items-center p-4 rounded-lg shadow-sm bg-gray-100 animate-pulse"
        >
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 mr-4">
            <Skeleton className="w-full h-full rounded-full" />
          </div>

          {/* Text Skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CandidateLoader;
