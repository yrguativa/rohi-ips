import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../loginPage';
import RegisterPage from '../registerPage';

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path='/*' element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
