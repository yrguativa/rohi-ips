import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

import { UserRouter } from '../pages/router/userRouter';
import { AuthRouter } from '../auth/router/authRouter';

export const AppRouter = () => {
    const { status } = useAppSelector(state => state.userAuthState);

    return (
        <Routes>            
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<UserRouter/>} />
                    : <Route path="/auth/*" element={<AuthRouter />} />
            }        

            <Route path='/*' element={<Navigate to='/auth/' />} />
        </Routes>
    )
}
