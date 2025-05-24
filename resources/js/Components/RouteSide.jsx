import React from "react";

const RouteSide = ({ nama, children, ...props }) => {
    return (
        <li>
            <a
                {...props}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-slate-800 hover:bg-stone-300 group"
            >
                {children}
                <span className="ms-3 hidden md:block">{nama}</span>
            </a>
        </li>
    );
};

export default RouteSide;
