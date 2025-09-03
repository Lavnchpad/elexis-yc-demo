"use client"

import React, { useEffect, useState, useRef } from "react"

const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};


// MultiSelectSearch Component
export default function MultiSelectSearch({
    items = [],
    placeholder = "Select items...",
    onSelectionChange,
    initialSelectedValues = [],
}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
    const componentRef = useRef(null);


    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(selectedValues);
        }
    }, [selectedValues, onSelectionChange]);

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle item selection/deselection
    const handleSelect = (itemValue) => {
        setSelectedValues((prevSelected) => {
            if (prevSelected.includes(itemValue)) {
                // Deselect item
                return prevSelected.filter((value) => value !== itemValue);
            } else {
                // Select item
                return [...prevSelected, itemValue];
            }
        });
        setInputValue("");

    };

    // Handle removal of a selected badge
    const handleRemoveBadge = (itemValue) => {
        setSelectedValues((prevSelected) =>
            prevSelected.filter((value) => value !== itemValue)
        );
    };

    // Filter items based on input value
    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div ref={componentRef} className="relative w-full max-w-md">
            {/* Input and Selected Badges Container */}
            <div
                className={cn(
                    "flex min-h-[40px] w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
                    "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
                    open && "rounded-b-none"
                )}
                onClick={() => setOpen(!open)}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls="multi-select-list"
            >
                {selectedValues.length > 0 ? (
                    <div className="flex flex-wrap gap-1 pr-8"> {/* Added pr-8 to prevent badges overlapping chevron */}
                        {selectedValues.map((value) => {
                            const item = items.find((i) => i.value === value);
                            return item ? (
                                <span
                                    key={item.value}
                                    className="inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800"
                                >
                                    {item.label}
                                    <button
                                        type="button"
                                        className="ml-1 -mr-0.5 h-4 w-4 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent dropdown from toggling when clicking remove
                                            handleRemoveBadge(item.value);
                                        }}
                                        aria-label={`Remove ${item.label}`}
                                    >
                                        {/* Simple X icon using SVG */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="h-3 w-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            ) : null;
                        })}
                    </div>
                ) : (
                    <span className="text-gray-500">{placeholder}</span>
                )}
                {/* Dropdown chevron icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75L15.75 15M8.25 9L12 5.25L15.75 9" />
                    </svg>
                </div>
            </div>

            {/* Dropdown Content */}
            {open && (
                <div
                    className="absolute z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg mt-1"
                    id="multi-select-list"
                    role="listbox"
                >
                    <div className="p-2 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside search input
                            aria-label="Search items"
                        />
                    </div>
                    <ul className="max-h-60 overflow-y-auto p-1">
                        {filteredItems.length === 0 ? (
                            <li className="px-3 py-2 text-pink-500">No items found.</li>
                        ) : (
                            filteredItems.map((item) => (
                                <li
                                    key={item.value}
                                    className={cn(
                                        "relative cursor-pointer select-none py-2 pl-8 pr-3 text-gray-900",
                                        "hover:bg-gray-100 rounded-md text-sm",
                                        selectedValues.includes(item.value) && "font-semibold bg-pink-50"
                                    )}
                                    onClick={() => handleSelect(item.value)}
                                    role="option"
                                    aria-selected={selectedValues.includes(item.value)}
                                >
                                    {selectedValues.includes(item.value) && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                                            {/* Checkmark icon using SVG */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 text-pink-600"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75L10.5 18.75L19.5 5.25" />
                                            </svg>
                                        </span>
                                    )}
                                    {item.label}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}