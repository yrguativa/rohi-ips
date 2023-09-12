import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from './firebase/config'
import { AppRouter } from './router/AppRouter'
import { useAppDispatch } from './hooks/hooks'

import { thunkCheckedLogin } from './store/slices/auth'

import './App.css'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      dispatch(thunkCheckedLogin(user));
    })
  }, [dispatch]);

  return (
    <AppRouter />
  )
}

export default App;