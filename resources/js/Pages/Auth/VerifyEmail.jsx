import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <Head title="Email Verification" />
            <div className="w-11/12 sm:w-3/4 md:w-1/2 max-w-sm border-black border">
                <div className="border-b rounded-b-[150%] h-auto p-2 border-b-black bg-blue-600">
                    <a className="flex w-full justify-center " href="/">
                        <img
                            src="../img/logo.png"
                            className="w-20 h-20 border rounded-full border-black object-cover p-4 bg-white"
                            alt=""
                        />
                    </a>
                </div>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <PrimaryButton disabled={processing}>
                                Resend Verification Email
                            </PrimaryButton>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
