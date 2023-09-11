import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../hooks/hooks";
import { thunkLogin, thunkSignInGoogle } from "../../store/slices/auth";

type FormLogin = {
    email: string;
    password: string;
};
//https://github.com/davidgrzyb/tailwind-auth-template/blob/master/login.html

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>();

    const loginGoogle = () => dispatch(thunkSignInGoogle());
    const onSubmit: SubmitHandler<FormLogin> = data => {
        console.log(data);
        dispatch(thunkLogin(data.email, data.password));
    }

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black dark:text-white">
                    Iniciar sesión
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500 dark:border-strokedark dark:bg-boxdark">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Correo Electronico
                    </label>
                    <input id="email" type="text" placeholder="Email" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        + (errors.email && " border-red-500 ")}
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email es requerido'
                            }
                        })}>
                    </input>
                    {
                        errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>
                    }
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input id="password" type="password" placeholder="******************" className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        + (errors.password && " border-red-500 ")}
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Password es requerido'
                            },
                            minLength: {
                                value: 8,
                                message: 'Password debe tener mínimo 8 caracteres'
                            }
                        })}>
                    </input>
                    {
                        errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>
                    }
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90" >
                        Ingresar
                    </button>
                </div>
                <div className="mt-2 text-center">
                    <a className="text-primary" href="#">
                        ¿Has olvidado tu contraseña?
                    </a>
                </div>
                <div className="mt-6 text-center">
                    <p className="font-medium">
                        ¿No tienes ninguna cuenta?
                        <a href="/" className="text-primary ml-2">Registrarse</a>
                    </p>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <button onClick={loginGoogle} className="flex w-full items-center justify-center gap-3.5 font-medium rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-70 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-70" type="button">
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_191_13499)">
                                    <path
                                        d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                                        fill="#4285F4" />
                                    <path
                                        d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                                        fill="#34A853" />
                                    <path
                                        d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                                        fill="#FBBC05" />
                                    <path
                                        d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                                        fill="#EB4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_191_13499">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        Iniciar sesión con Google
                    </button>
                </div>
            </form>
        </div>
    )
}

