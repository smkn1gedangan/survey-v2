import React from "react";

const BorrowIcon = ({className}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`${className}`}
        >
            <path
                fill="currentColor"
                d="M6 20V4zm9.925 3q-.65 0-1.225-.262t-1-.738l-5.05-6.05l2.15-2.15l4.2 2.075V7h2l4 4v8q0 1.65-1.175 2.825T17 23zM4 22V2h13v5h-2V4H6v16h6.025l1.675 2zm6.5-15q.425 0 .713-.288T11.5 6t-.288-.712T10.5 5t-.712.288T9.5 6t.288.713T10.5 7m5.425 14H17q.825 0 1.413-.575T19 19v-7.1l-2-2v9.225l-5.3-2.675l3.45 4.2q.15.175.35.263t.425.087"
            ></path>
        </svg>
    );
};

export default BorrowIcon;
