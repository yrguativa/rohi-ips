import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

import { AppRouter } from './router/AppRouter'
import Navbar from './Shared/Navbar/Navbar'
import './App.css'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from './firebase/config'
import { thunkCheckedLogin } from './store/slices/user'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {    
      dispatch(thunkCheckedLogin(user));
    })
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar></Navbar>
          <main>
            <AppRouter />
          </main>
        </div>
      </div>
    </>
  )
}

export default App;