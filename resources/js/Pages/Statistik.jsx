import { DoughnutChart, LineChart } from "@/Helper/Chart";
import Navbar from "@/Layouts/Navbar";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React from "react";

const Statistik = () => {
    const {
        data: dataDashboard,
        tahunAjarans,
        dataDonut,
        filters,
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

        router.get(route("statistik"), params, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Head title="Responden" />
            <Navbar></Navbar>
            <div className="flex gap-1 justify-center flex-wrap p-4">
                <div className="w-full flex items-center justify-center sm:justify-between flex-wrap">
                    <h1 className="p-5 text-lg font-semibold rtl:text-right text-gray-900 capitalize text-center">
                        Grafik Statistik Survey Peminatan Smkn 1 Gedangan
                    </h1>
                    <div className="my-6 w-72">
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
            </div>
        </div>
    );
};

export default Statistik;
