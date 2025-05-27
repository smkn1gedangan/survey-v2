import Pagination from "@/Components/Pagination";
import { AlertConfirm } from "@/Helper/Alert";
import { LineChart, DoughnutChart } from "@/Helper/Chart";
import DeleteIcon from "@/Icon/DeleteIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Dashboard = () => {
    const {
        data: dataDashboard,
        tahunAjarans,
        dataDonut,
        filters,
        masukans,
        auth,
    } = usePage().props;

    const { data: dataSearch, setData: setDataSearch } = useForm({
        ta: filters.ta ?? "",
    });

    const handleSearchChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const update = {
            ...dataSearch,
            [name]: value,
        };
        setDataSearch(update);
        const params = {};

        if (update.ta !== "") params.ta = update.ta;

        router.get(route("dashboard"), params, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Masukan Responden ${nama}`;
        const cb = () =>
            router.delete(route("delMasukan", id), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Data Feedback Berhasil Dihapus.",
                        icon: "success",
                        timer: 1000,
                    });
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex gap-1 justify-center flex-wrap">
                <h1 className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900">
                    Selamat Datang {auth.user?.name} , Semoga Harimu
                    Menyenangkan 😊
                </h1>
                <div className="my-6 w-full">
                    <select
                        onChange={(e) => handleSearchChange(e)}
                        value={dataSearch.ta}
                        name="ta"
                        id="ta"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                    >
                        <option value="">Default</option>

                        {tahunAjarans.length > 0 &&
                            tahunAjarans.map((ta) => (
                                <option key={ta.ta_id} value={ta.ta_id}>
                                    {ta.tahun_ajaran}
                                </option>
                            ))}
                    </select>
                </div>
                {dataSearch.ta === "" ? (
                    <div className="w-full sm:w-4/5">
                        <LineChart
                            datas={dataDashboard.map((item) => item.total)}
                            labels={dataDashboard.map((item) => item.tahun)}
                        />
                    </div>
                ) : (
                    <div className="w-full sm:w-3/5 ">
                        <DoughnutChart
                            datas={dataDonut.map((item) => item.total)}
                            labels={dataDonut.map((item) => item.jurusan)}
                        />
                    </div>
                )}
                <table className="w-full mt-10 text-sm text-left rtl:text-right text-gray-700">
                    <thead className="text-xs text-gray-50 uppercase bg-slate-900 border border-white">
                        <tr>
                            <th scope="col" className="px-4 text-center py-3">
                                #
                            </th>
                            <th scope="col" className="px-4 text-center py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-4 text-center py-3">
                                Email
                            </th>
                            <th scope="col" className="px-4 text-center py-3">
                                Masukan
                            </th>
                            <th scope="col" className="px-4 text-center py-3">
                                Dibuat Pada
                            </th>
                            <th scope="col" className="px-4 text-center py-3">
                                Opsi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {masukans.data?.length > 0 ? (
                            masukans.data.map((masukan, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b  border-gray-200"
                                >
                                    <td className="px-4 text-center py-4">
                                        {index}
                                    </td>

                                    <td className="px-4 text-center py-4">
                                        {masukan.user?.name}
                                    </td>
                                    <td className="px-4 text-center py-4">
                                        {masukan.user?.email}
                                    </td>
                                    <td className="px-4 text-center py-4">
                                        {masukan.masukan}
                                    </td>
                                    <td className="px-4 text-center py-4">
                                        {(() => {
                                            const date = new Date(
                                                masukan.created_at
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
                                    <td className="px-4 text-center py-4 flex justify-center">
                                        <div
                                            onClick={(e) =>
                                                handleDelete(
                                                    e,
                                                    masukan.id,
                                                    masukan.nama
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
                                    className="p-4 text-sm font-medium text-center"
                                    colSpan={4}
                                >
                                    Tidak ada feedback di tambahkan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination datas={masukans} />
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
