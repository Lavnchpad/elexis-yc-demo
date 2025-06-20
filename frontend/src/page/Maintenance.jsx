import React from "react";


export const Maintenance = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const startTime = queryParams.get('startTime') || null;
  const endTime = queryParams.get('endTime') || null;
  const message = queryParams.get('message') || "Service Unavailable";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Maintenance Mode</h1>
        <p className="text-lg mb-2">{message}</p>
        {startTime && endTime && (
          <p className="text-sm text-gray-600">
            Scheduled from {new Date(startTime).toLocaleString()} to {new Date(endTime).toLocaleString()}
          </p>
        )}
        <p className="text-sm text-gray-600">Please check back later.</p>
      </div>
      <div className="mt-8">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Status again 
        </button>
      </div>
    </div>
  );
}