import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

import RegisterPage from '../Pages/auth/registerPage';
import LoginPage from '../Pages/auth/loginPage';
import ContractCreatePage from '../Pages/contract/createPage';
import UserHomePage from '../Pages/userHome/userHomePage';
import ClientHomePage from '../Pages/clientHome/clientHomePage';

export const AppRouter = () => {
    const { status } = useAppSelector(state => state.userAuthState);

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<ClientHomePage />} />
                    : <Route path="/auth/" element={<LoginPage />} />
            }

            <Route path='/*' element={<Navigate to='/home/*' />} />

            {/* Login y Registro */}
            <Route path="/auth/" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/" element={<ClientHomePage />} />

            <Route path="/user/" element={<UserHomePage />} />
            
            <Route path="/contract/" element={<ContractCreatePage />} />
            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>
    )
}
