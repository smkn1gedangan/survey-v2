import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { AlertSuccess } from "@/Helper/Alert";
import LogoutIcon from "@/Icon/LogoutIcon";
import Footer from "@/Layouts/Footer";
import Navbar from "@/Layouts/Navbar";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
    const { auth } = usePage().props;
    const { processing, data, setData, post, reset, errors } = useForm({
        user_id: auth ? auth?.user?.id : 0,
        email: auth ? auth?.user?.email : "",
        nama: auth ? auth?.user?.name : "",
        masukan: "",
        "g-recaptcha-response": "",
    });
    const captchaRef = useRef(null);
    const submit = (e) => {
        e.preventDefault();
        post(route("masukan.store"), {
            onSuccess: (e) => {
                if (e.url !== "/verify-email") {
                    AlertSuccess(
                        "Berhasil Mengirim Feedback, Terimakasih Atas Dukungan Anda ",
                        10000
                    );
                }
                reset();
            },
        });
    };
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Head title="Responden" />
            <Navbar></Navbar>
            <section className="bg-white ">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
                        Kontak Kami
                    </h2>
                    <p className="mb-8 text-center text-gray-700 font-medium">
                        Jika Pengunjung menemukan error atau bug pada website
                        ini, silahkan kirimkan feedback dengan menyertakan email
                        pada form dibawah ini{" "}
                    </p>
                    {errors.user_id && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  text-center"
                            role="alert"
                        >
                            <span className="font-medium">Gagal!</span>{" "}
                            {errors.user_id}
                        </div>
                    )}
                    <div className="flex items-center my-4 justify-center">
                        {auth.user?.email ? (
                            <div
                                onClick={() => router.post(route("logout"))}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                            >
                                Logout Akun
                            </div>
                        ) : (
                            <Link
                                href={route("register")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Klik Disini Untuk Registrasi Akun
                            </Link>
                        )}
                    </div>
                    <form onSubmit={submit} className="space-y-8">
                        <div>
                            <InputLabel value={"email"} />
                            <TextInput
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                readOnly
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Anda Harus Login / Buat Akun Terlebih Dahulu"
                                className="block w-full placeholder:text-slate-700"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel value={"nama"} />
                            <TextInput
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                name="nama"
                                type="text"
                                readOnly
                                id="nama"
                                placeholder="Anda Harus Login / Buat Akun Terlebih Dahulu"
                                className="block w-full placeholder:text-slate-700"
                            />
                            <InputError
                                message={errors.nama}
                                className="mt-2"
                            />
                        </div>

                        <div className="">
                            <InputLabel value={"Pesan"} />
                            <textarea
                                id="masukan"
                                value={data.masukan}
                                onChange={(e) =>
                                    setData("masukan", e.target.value)
                                }
                                name="masukan"
                                rows="6"
                                className="block p-2.5 w-full text-sm text-gray-900  rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-700"
                                placeholder="biarkan kami mengetahui bug anda.."
                            ></textarea>
                            <InputError
                                message={errors.masukan}
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
                            <PrimaryButton className="" disabled={processing}>
                                {processing ? "Proses ..." : "Submit Form"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Contact;
