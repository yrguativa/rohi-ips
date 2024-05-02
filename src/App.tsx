import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from './firebase/config'
import { AppRouter } from './router/AppRouter'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { thunkCheckedLogin } from './store/slices/auth'

import ResponsePaymentPage from './pages/response/responsePaymentPage'

import './App.css'

function App() {
  const location = useLocation();
  const { status } = useAppSelector(state => state.userAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!location.pathname.startsWith('/ResponsePayment/')) {
      onAuthStateChanged(FirebaseAuth, async (user) => {
        if (status !== 'authenticated' || (user === null && status === 'authenticated')) {
          dispatch(thunkCheckedLogin(user));
        }
      })
    }
  }, [dispatch, location.pathname, status]);

  return (
    <Routes>
      {/* Response Pay MercadoPago*/}
      <Route path="/ResponsePayment/:idPayment/:statusResponse" element={<ResponsePaymentPage />} />

      {
        (!location.pathname.startsWith('/ResponsePayment/'))
        && <Route path='/*' element={<AppRouter />} />
      }
    </Routes>
  )
}

export default App;