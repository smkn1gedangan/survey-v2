import Canvas from "@/Components/Canavs";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { AlertSuccess } from "@/Helper/Alert";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { useGetProvince, useGetRegencies } from "@/Services/Api_call";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Welcome = () => {
    const { jurusans, pekerjaans, ta, flash } = usePage().props;
    const { data: provinceData } = useGetProvince();
    const [provinceId, setProvinceId] = useState("35");
    const { data: regenciesData } = useGetRegencies(provinceId);
    const captchaRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_calon_siswa: "",
        asal_sekolah: "",
        tempat_lahir: "",
        jurusan: "",
        tanggal_lahir: "",
        nama_ayah: "",
        nama_ibu: "",
        pekerjaan_ayah: "",
        pekerjaan_ibu: "",
        no_hp: 0,
        alamat_ortu: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("store-data-siswa"), {
            onSuccess: (e) => {
                e.props.flash.success &&
                    AlertSuccess(
                        "Berhasil Menambah Data , Silahkan Cek Halaman Responden Untuk Memastikan",
                        5000
                    );
                reset();
                captchaRef.current.reset();
            },
            onError: (e) => captchaRef.current.reset(),
        });
    };
    useEffect(() => {
        setData("ta_id", ta.ta_id);
    }, [ta]);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Navbar></Navbar>
            {ta ? (
                <>
                    {" "}
                    <header className="mt-4 space-y-2 p-2 sm:p-3 md:p-4">
                        <p className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl text-center">
                            Formulir Survey Peminatan Kompetensi Keahlian SMK
                            Negeri 1 Gedangan
                        </p>
                        <div className="text-sm font-medium text-center">
                            Kunjungi juga web resmi <span>Smkn 1 Gedangan</span>{" "}
                            <a href="" className="text-blue-800">
                                di sini
                            </a>
                        </div>
                        {flash?.success && (
                            <>
                                <div
                                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center"
                                    role="alert"
                                >
                                    <span className="font-medium ">
                                        Selamat!
                                    </span>{" "}
                                    Anda Telah Berhasil Mengisi Survey Dengan
                                    Baik dan Benar . silahkan mengunjungi
                                    halaman Responden untuk memastikan
                                </div>
                            </>
                        )}
                        {flash?.error && (
                            <>
                                <div
                                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
                                    role="alert"
                                >
                                    <span className="font-medium">Gagal!</span>{" "}
                                    {flash?.error}
                                </div>
                            </>
                        )}
                    </header>
                    <section className="p-4 flex justify-center">
                        <form
                            className="bg-white w-full border border-gray-200 shadow-md md:w-4/5 p-4 space-y-4"
                            onSubmit={submit}
                        >
                            <h1 className="text-center text-slate-900 font-semibold">
                                Tahun Pelajaran {ta.tahun_ajaran}
                            </h1>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    Data Calon Siswa
                                </h1>
                                <hr />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="nama_calon_siswa"
                                    value="Nama calon Siswa"
                                />

                                <TextInput
                                    id="nama_calon_siswa"
                                    type="text"
                                    name="nama_calon_siswa"
                                    value={data.nama_calon_siswa}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "nama_calon_siswa",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.nama_calon_siswa}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="asal_sekolah"
                                    value="Asal Sekolah"
                                />

                                <TextInput
                                    id="asal_sekolah"
                                    type="text"
                                    name="asal_sekolah"
                                    value={data.asal_sekolah}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("asal_sekolah", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.asal_sekolah}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Pilih Jurusan"} />
                                <select
                                    onChange={(e) =>
                                        setData("jurusan", e.target.value)
                                    }
                                    value={data.jurusan}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
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

                                <InputError
                                    message={errors.jurusan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Tempat Tanggal Lahir"} />
                                <select
                                    onChange={(e) =>
                                        setProvinceId(e.target.value)
                                    }
                                    value={provinceId}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 "
                                >
                                    {provinceData &&
                                        provinceData.map((province) => (
                                            <option
                                                key={province.id}
                                                value={province.id}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {provinceId !== "" && (
                                <div className="">
                                    <select
                                        onChange={(e) =>
                                            setData(
                                                "tempat_lahir",
                                                e.target.value
                                            )
                                        }
                                        value={data.tempat_lahir}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    >
                                        <option value="">Default</option>
                                        {regenciesData &&
                                            regenciesData.map((reg) => (
                                                <option
                                                    key={reg.id}
                                                    value={reg.name}
                                                >
                                                    {reg.name}
                                                </option>
                                            ))}
                                    </select>

                                    <InputError
                                        message={errors.tempat_lahir}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="tanggal_lahir"
                                    value="Masukkan Tanggal Lahir"
                                />

                                <TextInput
                                    id="tanggal_lahir"
                                    type="date"
                                    name="tanggal_lahir"
                                    value={data.tanggal_lahir}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.tanggal_lahir}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    Data orang Tua
                                </h1>
                                <hr />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="nama_ayah"
                                    value="Nama Ayah"
                                />
                                <TextInput
                                    id="nama_ayah"
                                    type="text"
                                    name="nama_ayah"
                                    value={data.nama_ayah}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama_ayah", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.nama_ayah}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="nama_ibu"
                                    value="Nama Ibu"
                                />
                                <TextInput
                                    id="nama_ibu"
                                    type="text"
                                    name="nama_ibu"
                                    value={data.nama_ibu}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama_ibu", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.nama_ibu}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Pekerjaan Ayah"} />
                                <select
                                    onChange={(e) =>
                                        setData(
                                            "pekerjaan_ayah",
                                            e.target.value
                                        )
                                    }
                                    value={data.pekerjaan_ayah}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {pekerjaans.length > 0 &&
                                        pekerjaans.map((pekerjaan) => (
                                            <option key={pekerjaan.id}>
                                                {pekerjaan.nama}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.pekerjaan_ayah}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Pekerjaan Ibu"} />
                                <select
                                    onChange={(e) =>
                                        setData("pekerjaan_ibu", e.target.value)
                                    }
                                    value={data.pekerjaan_ibu}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {pekerjaans.length > 0 &&
                                        pekerjaans.map((pekerjaan) => (
                                            <option key={pekerjaan.id}>
                                                {pekerjaan.nama}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.pekerjaan_ibu}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="no_hp"
                                    value="Masukkan Nomor Hp Aktif ( Pastikan Di Awali Angka 0 )"
                                />

                                <TextInput
                                    id="no_hp"
                                    type="number"
                                    min="1"
                                    man="13"
                                    name="no_hp"
                                    value={data.no_hp}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("no_hp", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.no_hp}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="alamat_ortu"
                                    value="Alamat Orang Tua"
                                />
                                <TextInput
                                    id="alamat_ortu"
                                    type="text"
                                    name="alamat_ortu"
                                    value={data.alamat_ortu}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("alamat_ortu", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.alamat_ortu}
                                    className="mt-2"
                                />
                            </div>
                            <ReCAPTCHA
                                className="g-recaptcha"
                                ref={captchaRef}
                                onChange={(token) =>
                                    setData("g-recaptcha-response", token)
                                }
                                sitekey={import.meta.env.VITE_SITE_KEY}
                            ></ReCAPTCHA>
                            <InputError
                                message={errors["g-recaptcha-response"]}
                                className="mt-2"
                            />
                            <div className="mt-4 flex items-center justify-start">
                                <PrimaryButton
                                    className=""
                                    disabled={processing}
                                >
                                    {processing ? "Proses ..." : "Submit Form"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </section>
                </>
            ) : (
                <h1 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl text-center p-4">
                    Mohon maaf, saat ini tidak sedang membuka pendaftaran.
                    <br>Terima kasih atas kunjungannya!</br>
                </h1>
            )}
            <Footer />
        </div>
    );
};

export default Welcome;
