import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

import RegisterPage from '../Pages/auth/registerPage';
import LoginPage from '../Pages/auth/loginPage';
import ClientHome from '../Pages/clientHome/ClientHome';
import ContractCreatePage from '../Pages/contract/createPage';

export const AppRouter = () => {
    const { status } = useAppSelector(state => state.userAuth);

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<ClientHome />} />
                    : <Route path="/auth/*" element={<LoginPage />} />
            }

            <Route path='/*' element={<Navigate to='/home/*' />} />

            {/* Login y Registro */}
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/" element={<ClientHome />} />
            
            <Route path="/contract/" element={<ContractCreatePage />} />
            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>
    )
}
