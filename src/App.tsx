import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from './firebase/config'
import { AppRouter } from './router/AppRouter'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

import { thunkCheckedLogin } from './store/slices/auth'

import './App.css'


function App() {
  const { status } = useAppSelector(state => state.userAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (status !== 'authenticated'|| (user === null && status === 'authenticated')) {
        dispatch(thunkCheckedLogin(user));
      }
    })

  }, [dispatch, status]);

  return (
    <AppRouter />
  )
}

export default App;