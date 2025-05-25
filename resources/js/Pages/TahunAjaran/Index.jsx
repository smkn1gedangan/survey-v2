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
import PlusIcon from "@/Icon/PlusIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Index = () => {
    const { tahunAjarans } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, seteditModal] = useState(null);
    const { data, setData, errors, post, processing, reset } = useForm({
        tahun: "",
        aktif: "yes",
    });
    const {
        data: dataEdit,
        setData: setDataEdit,
        errors: errorsEdit,
        processing: processingEdit,
        put,
    } = useForm({
        tahun: "",
        aktif: "",
    });
    const handleDelete = (e, id) => {
        e.preventDefault();
        const text =
            "Menghapus Tahun Ajaran , akan menghapus data siswa berdasarkan tahun tersebut";
        const cb = () =>
            router.delete(route("tahunAjaran.destroy", id), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Tahun Ajaran Berhasil Dihapus.",
                        icon: "success",
                        timer: 1000,
                    });
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("tahunAjaran.store"), {
            onSuccess: (e) => {
                AlertSuccess("Berhasil Menambah Tahun Ajaran Baru");
                setCreateModal(false);
                reset();
            },
        });
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        const filtered = tahunAjarans.data.find((ta) => ta.ta_id === id);
        if (filtered) {
            setDataEdit("aktif", filtered.aktif);
            setDataEdit("tahun", filtered.tahun_ajaran);
            const dataFilter = {
                active: true,
                ...filtered,
            };
            seteditModal(dataFilter);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("tahunAjaran.update", editModal.ta_id), {
            onSuccess: (e) => {
                AlertSuccess("Berhasil Mengubah Tahun Ajaran");
                seteditModal(null);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tahun Ajaran" />
            <TitlePage
                title={"Tahun Ajaran"}
                onClick={() => setCreateModal(true)}
                nameRoute={"Tambah Tahun Ajaran"}
                quote={"data tahun ajaran survey peminatan Smkn 1 Gedangan"}
            ></TitlePage>
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
                                    Tahun Ajaran
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Aktif
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 text-center py-3"
                                >
                                    Dibuat Oleh
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
                            {tahunAjarans.data?.length > 0 ? (
                                tahunAjarans.data?.map((ta, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + tahunAjarans.from}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {ta.tahun_ajaran}
                                        </td>
                                        <td
                                            className={`${
                                                ta.aktif === "yes" &&
                                                "bg-blue-700 text-white"
                                            } px-4 text-center py-4`}
                                        >
                                            {ta.aktif}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {ta.created_by}
                                        </td>
                                        <td className="px-4 text-center py-4 flex justify-center gap-2">
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(e, ta.ta_id)
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                            >
                                                <EditIcon />
                                            </div>
                                            <Modal
                                                show={
                                                    editModal?.ta_id ===
                                                    ta.ta_id
                                                }
                                                onClose={() =>
                                                    seteditModal(null)
                                                }
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm ">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-900 ">
                                                            Ubah Tahun Ajaran
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
                                                        className="p-4 md:p-5"
                                                    >
                                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Tahun Ajaran   Contoh ( 2016 - 2017 )"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="tahun"
                                                                    type="text"
                                                                    name="tahun"
                                                                    value={
                                                                        dataEdit.tahun
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDataEdit(
                                                                            "tahun",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errorsEdit.tahun
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Keaktifan"
                                                                    }
                                                                />
                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDataEdit(
                                                                            "aktif",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={
                                                                        dataEdit.aktif
                                                                    }
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                >
                                                                    <option
                                                                        value={
                                                                            "yes"
                                                                        }
                                                                    >
                                                                        Ya
                                                                    </option>
                                                                    <option
                                                                        value={
                                                                            "no"
                                                                        }
                                                                    >
                                                                        Tidak
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="text-white inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            disabled={
                                                                processingEdit
                                                            }
                                                        >
                                                            <EditIcon />
                                                            {processingEdit
                                                                ? "Proses..."
                                                                : "Ubah Tahun Ajaran"}
                                                        </button>
                                                    </form>
                                                </div>
                                            </Modal>
                                            <div
                                                onClick={(e) =>
                                                    handleDelete(e, ta.ta_id)
                                                }
                                                className="font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer"
                                            >
                                                <DeleteIcon />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="p-2 text-sm font-medium text-center"
                                        colSpan={4}
                                    >
                                        Tidak ada Tahun Ajaran Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination datas={tahunAjarans}></Pagination>
                <Modal
                    show={createModal}
                    onClose={() => setCreateModal(!createModal)}
                >
                    <div className="relative bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                tambah Tahun Ajaran
                            </h3>
                            <button
                                type="button"
                                onClick={() => setCreateModal(!createModal)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ExitIcon />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleStore} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <InputLabel
                                        value={
                                            "Tahun Ajaran contoh (2016 - 2017) "
                                        }
                                    />
                                    <TextInput
                                        id="tahun"
                                        type="text"
                                        name="tahun"
                                        value={data.tahun}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("tahun", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.tahun}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <InputLabel value={"Keaktifan"} />
                                    <TextInput
                                        id="aktif"
                                        type="text"
                                        name="aktif"
                                        readOnly
                                        value={data.aktif}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("aktif", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.aktif}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={processing}
                            >
                                <PlusIcon />
                                {processing
                                    ? "Proses..."
                                    : "Tambah Tahun Ajaran"}
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
