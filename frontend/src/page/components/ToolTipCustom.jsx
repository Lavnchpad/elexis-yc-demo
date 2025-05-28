import { useState } from 'react'
import { twMerge } from 'tailwind-merge';

export default function Tooltip({ className, message, children, position }) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block" // Tailwind classes for positioning
        >
            {children}
            {isHovering && (
                <div
                    className={twMerge("absolute flex flex-wrap text-wrap  bg-white-800  px-2 py-1 rounded-md z-10 whitespace-nowrap transition-opacity duration-300", `${position === 'right' ? 'left-full top-full' : 'left-0 top-full'}`, className)}
                    style={{ opacity: isHovering ? 1 : 0 }} // For smooth transition
                >
                    <div className="absolute -top-2 -rotate-90 left-2 w-0 h-0 border-l-4 border-l-gray-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    <span className='text-xs'>
                        {message}
                    </span>
                </div>
            )}
        </div>
    )
}
