import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TitlePage from "@/Components/TitlePage";
import { AlertConfirm, AlertSuccess } from "@/Helper/Alert";
import DeleteIcon from "@/Icon/DeleteIcon";
import EditIcon from "@/Icon/EditIcon";
import ExitIcon from "@/Icon/ExitIcon";
import FilterIcon from "@/Icon/FilterIcon";
import KeyIcon from "@/Icon/KeyIcon";
import PlusIcon from "@/Icon/PlusIcon";
import ReturnedIcon from "@/Icon/ReturnedIcon";
import SpyIcon from "@/Icon/SpyIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Index = () => {
    const { dataSiswas, tahunAjarans, filters, jurusans } = usePage().props;
    const [editModal, seteditModal] = useState(null);
    const [dataShow, setDataShow] = useState(null);
    const [sortModal, setSortModal] = useState(false);
    const {
        data: dataSearch,
        setData: setDataSearch,
        processing,
        reset,
    } = useForm({
        tahun: filters.tahun ?? "",
        filtering: filters.filtering ?? "",
        search: filters.search ?? "",
        sort_by: filters.sort_by ?? "",
        sort_order: filters.sort_order ?? "asc",
    });

    const {
        data: dataEdit,
        setData: setDataEdit,
        errors: errorsEdit,
        processing: processingEdit,
        put,
    } = useForm({
        status_penerimaan: "",
    });
    const handleSearchChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const updated = {
            ...dataSearch,
            [name]: value,
        };
        setDataSearch(updated);

        const params = {};

        if (updated.tahun !== "") params.tahun = updated.tahun;
        if (updated.search !== "") params.search = updated.search;
        if (updated.sort_by !== "") params.sort_by = updated.sort_by;
        if (updated.sort_order !== "" && updated.sort_by !== "")
            params.sort_order = updated.sort_order;
        if (updated.filtering !== "") params.filtering = updated.filtering;

        router.get(route("dataSiswa.index"), params, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Data dari ${nama}`;
        const cb = () =>
            router.delete(route("dataSiswa.destroy", id), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Data Siswa Berhasil Dihapus.",
                        icon: "success",
                        timer: 1000,
                    });
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleEdit = (e, id) => {
        e.preventDefault();
        const filtered = dataSiswas.data.find(
            (dataSiswa) => dataSiswa.data_id === id
        );
        if (filtered) {
            setDataEdit("status_penerimaan", filtered.status_penerimaan);
            const dataFilter = {
                active: true,
                ...filtered,
            };
            seteditModal(dataFilter);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("dataSiswa.update", editModal.data_id), {
            onSuccess: (e) => {
                AlertSuccess("Berhasil Mengubah Data Siswa");
                seteditModal(null);
                reset();
            },
        });
    };
    const handleShow = (e, id) => {
        e.preventDefault();
        const filtered = dataSiswas.data.find((item) => item.data_id === id);
        if (filtered) {
            setDataShow(filtered);
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Data Siswa" />
            <TitlePage
                title={"Data Siswa"}
                onClick={() => {
                    window.location.href = route("exp_data_siswa", {
                        search: dataSearch.search,
                        sort_by: dataSearch.sort_by,
                        sort_order: dataSearch.sort_order,
                        tahun: dataSearch.tahun,
                        filtering: dataSearch.filtering,
                    });
                }}
                nameRoute={"Export To Excel"}
                quote={
                    "list data siswa yang telah survey peminatan di Smkn 1 Gedangan"
                }
            ></TitlePage>
            <div className="flex justify-end w-full p-2 pb-4">
                <select
                    onChange={(e) => handleSearchChange(e)}
                    value={dataSearch.tahun}
                    name="tahun"
                    id="tahun"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full sm:w-4/5 md:w-1/5"
                >
                    <option value="">Default</option>
                    {tahunAjarans.map((ta) => (
                        <option
                            className={`${
                                ta.aktif === "yes" && "bg-blue-700 text-white"
                            }`}
                            value={ta.tahun_ajaran}
                            key={ta.ta_id}
                        >
                            {ta.aktif === "yes"
                                ? ta.tahun_ajaran + " active"
                                : ta.tahun_ajaran}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pb-4 p-2 flex justify-between">
                <div className="relative mt-1 flex space-x-2 gap-2 items-center justify-center group">
                    <button
                        onClick={(e) => setSortModal(!sortModal)}
                        className="ml-2"
                        // route={""}
                        // tooltip={"Filter Waktu"}
                    >
                        <FilterIcon
                            className={"text-slate-800 w-8 h-8 cursor-pointer"}
                        />
                    </button>
                    <div
                        className="cursor-pointer absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden sm:group-hover:block
                            bg-gray-900 text-white text-sm px-3 py-1 rounded shadow text-center"
                    >
                        Sorting Data
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                    </div>
                </div>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <KeyIcon className={"w-4 h-4 text-slate-500"} />
                    </div>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={dataSearch.search}
                        onChange={(e) => handleSearchChange(e)}
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 sm:80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Cari Data Siswa"
                    />
                </div>
            </div>
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead className="text-xs text-gray-50 uppercase bg-slate-900 border border-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Nama
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    TTL
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Asal Sekolah
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    No Hp
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Jurusan
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Nama Orang Tua
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Tanggal Daftar
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Opsi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSiswas.data?.length > 0 ? (
                                dataSiswas.data?.map((dataSiswa, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            dataSiswa.status_penerimaan ===
                                                "tolak" &&
                                            "bg-red-800 text-white"
                                        } ${
                                            dataSiswa.status_penerimaan ===
                                                "terima" &&
                                            "bg-blue-700 text-white"
                                        }  border-b  border-gray-200 `}
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + dataSiswas.from}
                                        </td>

                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.nama_calon_siswa}
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.tempat_lahir_calon_siswa
                                                .length > 10
                                                ? dataSiswa.tempat_lahir_calon_siswa.slice(
                                                      0,
                                                      12
                                                  ) + "..."
                                                : dataSiswa.tempat_lahir_calon_siswa}
                                            &nbsp;,&nbsp;
                                            {
                                                dataSiswa.tanggal_lahir_calon_siswa
                                            }
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.asal_sekolah}
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.telepon_orang_tua_wali}
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.jurusan === "(Kosong)"
                                                ? "Tidak Memilih"
                                                : dataSiswa.jurusan}
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {dataSiswa.nama_ayah},
                                            {dataSiswa.nama_ibu}
                                        </td>
                                        <td className="px-4 text-center py-4 capitalize">
                                            {(() => {
                                                const date = new Date(
                                                    dataSiswa.created_date
                                                );
                                                const day = String(
                                                    date.getDate()
                                                ).padStart(2, "0");
                                                const month = String(
                                                    date.getMonth() + 1
                                                ).padStart(2, "0");
                                                const year = date.getFullYear();
                                                return `${day}-${month}-${year}`;
                                            })()}
                                        </td>

                                        <td className="px-4 text-center flex py-4 gap-2 items-center">
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(
                                                        e,
                                                        dataSiswa.data_id
                                                    )
                                                }
                                                className={`${
                                                    dataSiswa.status_penerimaan ===
                                                        "terima" && "text-white"
                                                } ${
                                                    dataSiswa.status_penerimaan ===
                                                        "tolak" && "text-white"
                                                } font-medium text-blue-600  cursor-pointer`}
                                            >
                                                <EditIcon />
                                            </div>
                                            <Modal
                                                show={
                                                    editModal?.data_id ===
                                                    dataSiswa.data_id
                                                }
                                                onClose={() =>
                                                    seteditModal(null)
                                                }
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm ">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-900 ">
                                                            Ubah Status
                                                            Penerimaan
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                seteditModal(
                                                                    null
                                                                )
                                                            }
                                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            <ExitIcon />
                                                            <span className="sr-only">
                                                                Close modal
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <form
                                                        onSubmit={handleUpdate}
                                                        className="p-4 md:p-6"
                                                    >
                                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Status Penerimaan"
                                                                    }
                                                                />
                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDataEdit(
                                                                            "status_penerimaan",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={
                                                                        dataEdit.status_penerimaan
                                                                    }
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                    name="status_penerimaan"
                                                                >
                                                                    <option
                                                                        value={
                                                                            ""
                                                                        }
                                                                    >
                                                                        Hiraukan
                                                                    </option>
                                                                    <option
                                                                        value={
                                                                            "terima"
                                                                        }
                                                                    >
                                                                        Terima
                                                                    </option>
                                                                    <option
                                                                        value={
                                                                            "tolak"
                                                                        }
                                                                    >
                                                                        Tolak
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            disabled={
                                                                processingEdit
                                                            }
                                                        >
                                                            <EditIcon />
                                                            {processingEdit
                                                                ? "Proses ..."
                                                                : "Ubah Status"}
                                                        </button>
                                                    </form>
                                                </div>
                                            </Modal>
                                            <div
                                                onClick={(e) =>
                                                    handleDelete(
                                                        e,
                                                        dataSiswa.data_id,
                                                        dataSiswa.nama_calon_siswa
                                                    )
                                                }
                                                className={`${
                                                    dataSiswa.status_penerimaan ===
                                                        "terima" && "text-white"
                                                } ${
                                                    dataSiswa.status_penerimaan ===
                                                        "tolak" && "text-white"
                                                } font-medium text-red-800  transition-all cursor-pointer`}
                                            >
                                                <DeleteIcon />
                                            </div>
                                            <div className="cursor-pointer">
                                                <SpyIcon
                                                    onClick={(e) =>
                                                        handleShow(
                                                            e,
                                                            dataSiswa.data_id
                                                        )
                                                    }
                                                />
                                                {dataShow?.data_id ===
                                                    dataSiswa.data_id && (
                                                    <Modal
                                                        show={dataShow}
                                                        onClose={() =>
                                                            setDataShow(
                                                                !dataShow
                                                            )
                                                        }
                                                    >
                                                        <div className="relative bg-white rounded-lg shadow-sm ">
                                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                                <h3 className="text-lg font-semibold text-gray-900 ">
                                                                    Data{" "}
                                                                    {
                                                                        dataShow.nama_calon_siswa
                                                                    }
                                                                </h3>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setDataShow(
                                                                            null
                                                                        )
                                                                    }
                                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                                >
                                                                    <ExitIcon />
                                                                    <span className="sr-only">
                                                                        Close
                                                                        modal
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <div className="grid gap-2 mb-4 grid-cols-1 p-4">
                                                                    <h1 className="font-medium text-xl text-black">
                                                                        Data
                                                                        Siswa
                                                                    </h1>
                                                                    <div className="table ">
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Nama
                                                                                    Calon
                                                                                    Siswa
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.nama_calon_siswa
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Tempat,
                                                                                    Tanggal
                                                                                    Lahir
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.tempat_lahir_calon_siswa
                                                                                }
                                                                                ,&nbsp;&nbsp;
                                                                                {
                                                                                    dataShow.tanggal_lahir_calon_siswa
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Asal
                                                                                    Sekolah
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.asal_sekolah
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    No
                                                                                    Telepon
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.telepon_orang_tua_wali
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Jurusan
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {dataShow.jurusan ===
                                                                                "(Kosong)"
                                                                                    ? "Tidak Memilih"
                                                                                    : dataShow.jurusan}
                                                                            </div>
                                                                        </div>

                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Nama
                                                                                    Ayah
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.nama_ayah
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Nama
                                                                                    Ibu
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.nama_ibu
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Pekerjaan
                                                                                    Orang
                                                                                    Tua
                                                                                    Wali
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.pekerjaan_orang_tua_wali
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Alamat
                                                                                    Orang
                                                                                    Tua
                                                                                    Wali
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {
                                                                                    dataShow.alamat_orang_tua_wali
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Tanggal
                                                                                    Daftar
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :{" "}
                                                                                {(() => {
                                                                                    const date =
                                                                                        new Date(
                                                                                            dataSiswa.created_date
                                                                                        );
                                                                                    const day =
                                                                                        String(
                                                                                            date.getDate()
                                                                                        ).padStart(
                                                                                            2,
                                                                                            "0"
                                                                                        );
                                                                                    const month =
                                                                                        String(
                                                                                            date.getMonth() +
                                                                                                1
                                                                                        ).padStart(
                                                                                            2,
                                                                                            "0"
                                                                                        );
                                                                                    const year =
                                                                                        date.getFullYear();
                                                                                    return `${day}-${month}-${year}`;
                                                                                })()}
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-row">
                                                                            <div className="table-cell pr-4 pt-2">
                                                                                <b>
                                                                                    Status
                                                                                    Penerimaan
                                                                                </b>
                                                                            </div>
                                                                            <div className="table-cell">
                                                                                :&nbsp;Di
                                                                                {dataShow.status_penerimaan ===
                                                                                ""
                                                                                    ? "proses"
                                                                                    : dataShow.status_penerimaan}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <a
                                                                        className="flex justify-center items-center rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-100 bg-gray-900 shadow-sm transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 gap-2 cursor-pointer mt-4"
                                                                        href={route(
                                                                            "export_data_siswa_to_pdf_admin",
                                                                            dataShow.data_id
                                                                        )}
                                                                    >
                                                                        <span className="hidden md:block">
                                                                            Export
                                                                            to
                                                                            Pdf
                                                                        </span>
                                                                        <PlusIcon />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="p-2 text-sm font-medium text-center"
                                        colSpan={8}
                                    >
                                        Tidak ada Data Siswa Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination datas={dataSiswas}></Pagination>
            </div>
            <Modal show={sortModal} onClose={() => setSortModal(!sortModal)}>
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Sorting Data Per Kolom
                        </h3>
                        <button
                            type="button"
                            onClick={() => setSortModal(!sortModal)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <ExitIcon />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div>
                        <div className="grid gap-4 mb-4 grid-cols-2 p-4">
                            <div className="">
                                <InputLabel value={"Data"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.sort_by}
                                    id="sort_by"
                                    name="sort_by"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    <option value="nama_calon_siswa">
                                        Nama Calon Siswa
                                    </option>
                                    <option value="tanggal_lahir_calon_siswa">
                                        Tanggal Lahir
                                    </option>
                                    <option value="asal_sekolah">
                                        Asal Sekolah
                                    </option>
                                    <option value="jurusan">Jurusan</option>
                                    <option value="nama_ayah">Nama Ayah</option>
                                    <option value="nama_ibu">Nama Ibu</option>
                                    <option value="created_date">
                                        Tanggal Daftar
                                    </option>
                                </select>
                            </div>
                            {dataSearch.sort_by !== "" && (
                                <div className="">
                                    <InputLabel value={"Sorting"} />
                                    <select
                                        onChange={(e) => handleSearchChange(e)}
                                        value={dataSearch.sort_order}
                                        id="sort_order"
                                        name="sort_order"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                    >
                                        <option value="asc">Awal</option>
                                        <option value="desc">Akhir</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Filtering Jurusan
                        </h3>
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="">
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.filtering}
                                    id="filtering"
                                    name="filtering"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    {jurusans.length > 0 &&
                                        jurusans.map((jurusan) => (
                                            <option
                                                key={jurusan.id}
                                                value={jurusan.samaran}
                                            >
                                                {jurusan.nama}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
