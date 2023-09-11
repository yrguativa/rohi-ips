import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from './firebase/config'
import { AppRouter } from './router/AppRouter'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

import { thunkCheckedLogin } from './store/slices/auth'
import Sidebar from './shared/sidebar'
import Navbar from './shared/navbar'

import './App.css'

function App() {
  const dispatch = useAppDispatch();
  const { uiState: { DarkMode } } = useAppSelector(state => state);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      dispatch(thunkCheckedLogin(user));
    })
  }, [dispatch]);

  return (
    <div className={"flex h-screen overflow-hidden " + (DarkMode && 'dark text-bodydark bg-boxdark-2')}>
      <Sidebar></Sidebar>
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Navbar></Navbar>
        <main>
          <AppRouter />
        </main>
      </div>
    </div>
  )
}

export default App;