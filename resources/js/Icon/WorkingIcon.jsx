import React from "react";

const WorkingIcon = ({ className }) => {
    return (
        <svg
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 1.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v5h-1V2H4v12h3v1H3.5a.5.5 0 0 1-.5-.5zM11 5H5V4h6zM9 7H5V6h4zm1.5 2V8h1v1H13v1h-2.5c-.274 0-.5.226-.5.5s.226.5.5.5h1c.826 0 1.5.674 1.5 1.5s-.674 1.5-1.5 1.5v1h-1v-1H9v-1h2.5c.274 0 .5-.226.5-.5s-.226-.5-.5-.5h-1c-.826 0-1.5-.674-1.5-1.5S9.674 9 10.5 9M7 12H5v-1h2z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export default WorkingIcon;
