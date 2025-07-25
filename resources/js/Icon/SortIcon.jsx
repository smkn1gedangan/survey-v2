import React from "react";

export const SortByLetterIcon = ({ className, ...props }) => {
    return (
        <svg
            {...props}
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M7 4l3 3M7 4L4 7m9-3h6l-6 6h6m-6.5 10l3.5-7l3.5 7M14 18h4"
            ></path>
        </svg>
    );
};

export const SortIcon = ({ className, ...props }) => {
    return (
        <svg
            {...props}
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
        >
            <g fill="currentColor">
                <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"></path>
                <path
                    fillRule="evenodd"
                    d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45c.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742c-.91 0-1.72-.613-1.72-1.758c0-1.148.848-1.835 1.973-1.835c1.09 0 2.063.636 2.063 2.687c0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972c0-.633-.398-1.008-.94-1.008c-.52 0-.927.375-.927 1c0 .64.418.98.934.98"
                ></path>
                <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"></path>
            </g>
        </svg>
    );
};
