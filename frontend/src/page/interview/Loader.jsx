import React from "react";
export const InterviewLoader = ({ variant = 'loader' }) => {
    return (
        <div className="w-full h-screen">
            <div className="flex h-full justify-center items-center">
                <div className="p-4 space-y-4">
                    {variant === 'error' ? 'Error loading interview information.' : 'Loading...'}
                </div>
            </div>
        </div>
    );
}