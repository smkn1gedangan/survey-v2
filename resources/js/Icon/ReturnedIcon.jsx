import React from "react";

const ReturnedIcon = ({ className }) => {
    return (
        <svg
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
                strokeWidth={1.5}
                d="M15.527 15.977h3.24c1.278-.021 3.233.652 3.233 3.08C22 21.577 19.588 22 18.766 22H7.946C5.438 22 2 21.491 2 17.17V8.002h20v4.517m-6.473 3.457a.8.8 0 0 1 .273-.58l1.702-1.42m-1.975 2a.8.8 0 0 0 .275.623l1.7 1.383M2.006 7.991l.921-2.3c.748-1.789 1.122-2.683 1.88-3.186S6.537 2 8.48 2h7.02c1.944 0 2.916 0 3.674.504c.758.503 1.131 1.397 1.88 3.185L22 7.995m-10.037.006v-6m-2 10h4"
                color="currentColor"
            ></path>
        </svg>
    );
};

export default ReturnedIcon;
