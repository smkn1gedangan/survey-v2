import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)");

        setOpenNav(mediaQuery.matches);

        const handleResize = () => {
            setOpenNav(mediaQuery.matches);
        };
        mediaQuery.addEventListener("change", handleResize);
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);
    return (
        <nav className={`${!openNav && "h-16"} bg-gray-900 border-gray-200  `}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href={route("welcome")}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src="../img/logo.png" className="h-8" alt="Logo" />
                </a>
                <button
                    onClick={() => {
                        setOpenNav(!openNav);
                    }}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`max-sm:transition-all max-sm:duration-300 max-sm:ease-in-out max-sm:transform ${
                        openNav
                            ? "max-sm:opacity-100 max-sm:translate-y-0 max-sm:scale-100"
                            : "opacity-0 -translate-y-full scale-0 pointer-events-none invisible"
                    } w-full md:block md:w-auto`}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                        <li>
                            <a
                                href={route("welcome")}
                                className="block py-2 px-3 text-gray-50  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                            >
                                Isi Survey
                            </a>
                        </li>

                        <li>
                            <a
                                href={route("responden")}
                                className="block py-2 px-3 text-gray-50  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                Responden / Peserta
                            </a>
                        </li>
                        <li>
                            <a
                                href={route("statistik")}
                                className="block py-2 px-3 text-gray-50  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                Statistik
                            </a>
                        </li>
                        <li>
                            <a
                                href={route("masukan.index")}
                                className="block py-2 px-3 text-gray-50  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                Kontak
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
