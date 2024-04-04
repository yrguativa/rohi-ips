import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { darkModeToggle } from '../store/slices/ui/uiSlice';
import { thunkLogout } from '../store/slices/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { clearContractsFilter, getContractsFilter } from '../store/slices/contract';

type SearchContractForm = {
    textSearch: string;
};

export default function Navbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userAuthState: { displayName, email, photoURL }, uiState: { DarkMode } } = useAppSelector(state => state);

    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { register, handleSubmit } = useForm<SearchContractForm>();

    const onSubmit: SubmitHandler<SearchContractForm> = data => {
        const { textSearch } = data;
        if (!textSearch || textSearch == null || textSearch == undefined || textSearch.trim() === '' || textSearch.length < 1) {
            dispatch(clearContractsFilter());
        }

        dispatch(getContractsFilter(textSearch));
        navigate("/user");
    }

    const logoutHandler = () => {
        dispatch(thunkLogout());
        navigate("/auth/login");
    }
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden dark:border-strokedark dark:bg-boxdark"
                        onClick={() => setSidebarToggle(!sidebarToggle)}>
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                    className={"relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white " +
                                        (!sidebarToggle && '!w-full delay-300 ')}>
                                </span>
                                <span
                                    className={"relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white " +
                                        (!sidebarToggle && '!w-full delay-400 ')}>
                                </span>
                                <span
                                    className={"relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white " +
                                        (!sidebarToggle && '!w-full delay-500 ')}>
                                </span>
                            </span>
                            <span className="du-block absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={"absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-ou dark:bg-white " +
                                        (!sidebarToggle && '!h-0 delay-[0] ')}>
                                </span>
                                <span
                                    className={"delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out " +
                                        (!sidebarToggle && '!h-0 delay-200 ')}>
                                </span>
                            </span >
                        </span >
                    </button >

                    <NavLink to="/" className="block flex-shrink-0 lg:hidden">
                        <img decoding="async" width="52px"
                            src="https://rohiips.com/wp-content/uploads/2021/10/Logo.png"
                            alt="Logo ROHI IPS SAS" />
                    </NavLink>
                </div>

                <div className="hidden sm:block">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="relative">
                            <button type="submit" className="absolute top-1/2 left-0 -translate-y-1/2">
                                <svg width="20" height="20" className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                    viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                        fill="" />
                                    <path
                                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                        fill="" />
                                </svg>
                            </button>

                            <input type="text" placeholder="Escribe para buscar..."
                                className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                                {...register("textSearch")} />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* Dark Mode Toggler  */}
                        <li>
                            <label className={"relative m-0 block h-7.5 w-14 rounded-full bg-stroke dark:bg-primary"}>
                                <input type="checkbox" value="1" onChange={() => dispatch(darkModeToggle())}
                                    className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0" />
                                <span className={"absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear " +
                                    (DarkMode && '!right-[3px] !translate-x-full')}>
                                    <span className={DarkMode ? 'dark:hidden' : ''}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z"
                                                fill="#969AA1" />
                                            <path
                                                d="M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z"
                                                fill="#969AA1" />
                                        </svg>
                                    </span>
                                    <span className={"hidden " + 'dark:inline-block'}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z"
                                                fill="#969AA1" />
                                        </svg>
                                    </span>
                                </span>
                            </label>
                        </li>
                    </ul>

                    {/* User Area */}
                    <div className="relative"
                        // @click.outside="dropdownOpen = false"
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <a className="flex items-center gap-4" href="#"
                            // @click.prevent="dropdownOpen = ! dropdownOpen"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black dark:text-white">{displayName}</span>
                                <span className="block text-xs font-medium">{email}</span>
                            </span>

                            <span className="h-12 w-12 rounded-full">
                                {
                                    !photoURL && photoURL !== null ? <img src={photoURL} alt="User" className='rounded-full' style={{ width: 100 + '%' }} /> : <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><g fill="#DDC79C"><circle cx="12" cy="6" r="4" /><path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" opacity=".5" /></g></svg>
                                }
                            </span>

                            <svg className={"hidden fill-current sm:block" + (dropdownOpen && 'rotate-180')} width="12" height="8"
                                viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                                    fill="" />
                            </svg>
                        </a>

                        {/* Dropdown Start */}
                        {dropdownOpen && (
                            <div x-show="dropdownOpen"
                                className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <button onClick={logoutHandler}
                                    className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                    <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                            fill="" />
                                        <path
                                            d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                            fill="" />
                                    </svg>
                                    Log Out
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header>
    )
}
