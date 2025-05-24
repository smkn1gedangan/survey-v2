import PlusIcon from "@/Icon/PlusIcon";
import React from "react";

const TitlePage = ({ title, quote, nameRoute, ...props }) => {
    return (
        <div className="flex justify-between mt-4 p-2 items-center">
            <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 ">
                {title}
                <p className="mt-1 text-sm font-normal text-gray-500 ">
                    {quote}
                </p>
            </div>
            <div className="flex items-center gap-2">
                {/* <div
                    onClick={handleExport}
                    className={`${
                        params === "create" && "hidden"
                    } bg-blue-800 hover:bg-blue-700 focus:bg-blue-600 active:bg-blue-700 px-4 py-1 text-white rounded-md focus:ring-2 focus:ring-offset-2 cursor-pointer`}
                >
                    Export Excel
                </div> */}
                <div
                    {...props}
                    className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-100 bg-gray-900 shadow-sm transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 gap-2 cursor-pointer"
                >
                    <span className="hidden md:block">{nameRoute}</span>
                    <PlusIcon />
                </div>
            </div>
        </div>
    );
};

export default TitlePage;
