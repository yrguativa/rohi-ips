import { useForm } from "react-hook-form";

type RegisterForm = {
    UserName: string,
    Email: string,
    Password: string,
}

export default function RegisterPage() {
    const { register } = useForm<RegisterForm>();

    return (
        <form
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-black dark:text-white">
                    Registro Usuario
                </h3>
            </div>
            <form action="#">
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Nombre
                        </label>
                        <input type="text" placeholder="Ingrese su nombre completo"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            {...register("UserName", {
                                value: "Vanesa Bohorquez",
                                required: {
                                    value: true,
                                    message: "El nombre es obligatorio"
                                }
                            })} />
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Email
                        </label>
                        <input type="email" placeholder="Ingrese su email"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            {...register("Email", {
                                value: "vane@test.com",
                                required: {
                                    value: true,
                                    message: "El Email es obligatorio"
                                }
                            })} />
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Password
                        </label>
                        <input type="password" placeholder="Ingres su contraseña"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            {...register("Password", {
                                value: "Abc123456.",
                                required: {
                                    value: true,
                                    message:"La contraseña es obligatoria"
                                }
                            })} />
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Re-type Password
                        </label>
                        <input type="password" placeholder="Re-enter password"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                    </div>

                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                        Sign Up
                    </button>
                </div>
            </form>
        </form>
    );
}