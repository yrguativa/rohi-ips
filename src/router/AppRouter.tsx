import { Navigate, Route, Routes } from 'react-router-dom';
import ClientHome from '../Pages/clientHome/ClientHome';
import LoginPage from '../Pages/userHome/login/loginPage';
import { useAppSelector } from '../hooks/hooks';

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

            <Route path="/home/*" element={<ClientHome />} />
            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>
    )
}
