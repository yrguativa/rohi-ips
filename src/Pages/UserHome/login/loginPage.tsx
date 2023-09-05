import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../../hooks/hooks";
import { thunkLogin, thunkSignInGoogle } from "../../../store/slices/user";

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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500">
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
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
            <div className="flex items-center justify-between mt-5">
                <button onClick={loginGoogle} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In with Google
                </button>
            </div>
        </form>
    )
}

