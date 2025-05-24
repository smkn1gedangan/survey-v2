import { LineChart, DoughnutChart } from "@/Helper/Chart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const Dashboard = () => {
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

        router.get(route("dashboard"), params, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <AuthenticatedLayout>
            <div className="flex gap-1 justify-center flex-wrap">
                <h1 className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900">
                    Grafik Statistik Survey Peminatan SMKN 1 GEDANGAN
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
