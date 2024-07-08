import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Chats from './components/Chats'


function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat/:id' element={<Chats />} />
    </Routes>
   
    </>
  )
}

export default App
