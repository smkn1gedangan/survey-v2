import { Link, router, usePage } from "@inertiajs/react";
import BukuIcon from "@/Icon/BukuIcon";
import DashboardIcon from "@/Icon/DashboardIcon";
import PeminjamanIcon from "@/Icon/PeminjamanIcon";
import ReturnedIcon from "@/Icon/ReturnedIcon";
import EditIcon from "@/Icon/EditIcon";
import LogoutIcon from "@/Icon/LogoutIcon";
import Swal from "sweetalert2";
import KategoriIcon from "@/Icon/KategoriIcon";
import RouteSide from "@/Components/RouteSide";
import CalendarIcon from "@/Icon/CalendarIcon";
import WorkingIcon from "@/Icon/WorkingIcon";
import PeopleIcon from "@/Icon/PeopleIcon";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [openSideMenu, setOpenSideMenu] = useState(true);

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Apakah Yakin?",
            text: `Anda Akan Logout!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("logout"));
            }
        });
    };
    return (
        <div className="p-4 bg-stone-200">
            <button
                aria-controls="default-sidebar"
                type="button"
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className="inline-flex items-center p-2 mt-2 ms-0 sm:ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <div className="flex gap-2">
                {" "}
                <Transition
                    show={openSideMenu}
                    enter="transition ease-out duration-200"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                    className={`sm:block z-40 w-16 sm:w-64 min-h-auto transition-transform sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="h-full sm:p-3 py-4 overflow-y-auto">
                        <h1 className="text-center font-medium uppercase my-4 invisible sm:visible">
                            Main Menu
                        </h1>{" "}
                        <ul className="space-y-2 font-medium ">
                            <RouteSide
                                nama={"Dashboard"}
                                href={route("dashboard")}
                            >
                                {" "}
                                <DashboardIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>
                            <RouteSide
                                href={route("tahunAjaran.index")}
                                nama={"Tahun Ajaran"}
                            >
                                <CalendarIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>
                            <RouteSide
                                nama={"Jurusan"}
                                href={route("jurusan.index")}
                            >
                                <BukuIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>
                            <RouteSide
                                nama={"Pekerjaan"}
                                href={route("pekerjaan.index")}
                            >
                                <WorkingIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>
                            <RouteSide
                                nama={"Data Siswa"}
                                href={route("dataSiswa.index")}
                            >
                                <PeopleIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>
                        </ul>
                        <h1 className="text-center font-medium uppercase sm:mt-12 mb-4 invisible sm:visible">
                            Account Menu
                        </h1>{" "}
                        <ul className="space-y-2 font-medium">
                            <RouteSide
                                nama={"Edit Akun"}
                                href={route("profile.edit")}
                            >
                                {" "}
                                <EditIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                            </RouteSide>{" "}
                            <div
                                onClick={(e) => handleLogout(e)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-slate-800 hover:bg-stone-300 group"
                            >
                                <LogoutIcon
                                    className={
                                        "w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-700 "
                                    }
                                />
                                <h1 className="ms-3 hidden sm:block">
                                    Logout
                                </h1>
                            </div>
                        </ul>
                    </div>
                </Transition>
                <div className="p-2 mt-2 min-h-screen rounded-md bg-stone-100 w-full shadow-md overflow-x-auto sm:overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
