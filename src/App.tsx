import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { thunkCheckedLogin } from './store/slices/user'

import Navbar from './Shared/Navbar/Navbar'
import './App.css'
import ClientHome from './Pages/clientHome/ClientHome'

function App() {
  const { displayName } = useAppSelector(state => state.userAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkCheckedLogin)
  });

  return (
    <>
      <Navbar></Navbar>
      {displayName}
      <ClientHome></ClientHome>
    </>
  )
}

export default App
