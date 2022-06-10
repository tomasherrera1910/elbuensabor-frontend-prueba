import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import { NotFound } from './components/NotFound'
import {Home} from './components/Home'
import {Login} from './components/Login'
import {CreateAccount} from './components/CreateAccount'
import {Address} from './components/Address'
import {AdminLandingPage} from './components/Admin'
import RoleManager from './components/Admin/RoleManager'
import ArticulosInsumo from './components/Admin/ArticulosInsumo'
import ArticulosManufacturados from './components/Admin/ArticulosManufacturados'

function App() {
  return (
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createAccount' element={<CreateAccount/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/admin' element={<AdminLandingPage/>}/>
            <Route path='/admin/users' element={<RoleManager/>}/>
            <Route path='/admin/articulosInsumo' element={<ArticulosInsumo/>}/>
            <Route path='/admin/articulosManufacturados' element={<ArticulosManufacturados/>}/>
    </Routes>
   </BrowserRouter> 
  )
}

export default App;
