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
    const { pekerjaans } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, seteditModal] = useState(null);
    const { data, setData, errors, post, processing, reset } = useForm({
        nama: "",
    });
    const {
        data: dataEdit,
        setData: setDataEdit,
        errors: errorsEdit,
        processing: processingEdit,
        put,
    } = useForm({
        nama: "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Nama Pekerjaan ${nama}`;
        const cb = () =>
            router.delete(route("pekerjaan.destroy", id), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Data Berhasil Dihapus.",
                        icon: "success",
                        timer: 1000,
                    });
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("pekerjaan.store"), {
            onSuccess: (e) => {
                AlertSuccess("Berhasil Menambah Nama Pekerjaan Baru");
                setCreateModal(false);
                reset();
            },
        });
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        const filtered = pekerjaans.data.find(
            (pekerjaan) => pekerjaan.id === id
        );
        if (filtered) {
            setDataEdit("nama", filtered.nama);
            const dataFilter = {
                active: true,
                ...filtered,
            };
            seteditModal(dataFilter);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("pekerjaan.update", editModal.id), {
            onSuccess: (e) => {
                AlertSuccess("Berhasil Mengubah Data Pekerjaan");
                seteditModal(null);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pekerjaan" />
            <TitlePage
                title={"Pekerjaan"}
                onClick={() => setCreateModal(true)}
                nameRoute={"Tambah Nama Pekerjaan"}
                quote={
                    "data list pekerjaan orang tua, survey peminatan Smkn 1 Gedangan"
                }
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
                                    Nama Pekerjaan
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
                            {pekerjaans.data.length > 0 ? (
                                pekerjaans.data.map((pekerjaan, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + pekerjaans.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {pekerjaan.nama}
                                        </td>
                                        <td className="px-4 text-center py-4 flex justify-center gap-2">
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(e, pekerjaan.id)
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                            >
                                                <EditIcon />
                                            </div>
                                            <Modal
                                                show={
                                                    editModal?.id ===
                                                    pekerjaan.id
                                                }
                                                onClose={() =>
                                                    seteditModal(null)
                                                }
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm ">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-900 ">
                                                            Ubah pekerjaan{" "}
                                                            {editModal?.nama}
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
                                                                        "Nama Pekerjaan"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="nama"
                                                                    type="text"
                                                                    name="nama"
                                                                    value={
                                                                        dataEdit.nama
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDataEdit(
                                                                            "nama",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errorsEdit.nama
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="text-white inline-flex gap-2 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            disabled={
                                                                processingEdit
                                                            }
                                                        >
                                                            <EditIcon />
                                                            {processingEdit
                                                                ? "Proses..."
                                                                : "Ubah Nama Pekerjaan"}
                                                        </button>
                                                    </form>
                                                </div>
                                            </Modal>
                                            <div
                                                onClick={(e) =>
                                                    handleDelete(
                                                        e,
                                                        pekerjaan.id,
                                                        pekerjaan.nama
                                                    )
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
                                        colSpan={3}
                                    >
                                        Tidak ada Nama Pekerjaan Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination datas={pekerjaans}></Pagination>
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            tambah Nama Pekerjaan
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
                                <InputLabel value={"Nama pekerjaan"} />
                                <TextInput
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.nama}
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
                            {processing ? "Proses..." : "Tambah Nama Pekerjaan"}
                        </button>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
