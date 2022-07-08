import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import { NotFound } from './components/NotFound'
import {Home} from './components/Home'
import {Login} from './components/Login'
import {CreateAccount} from './components/CreateAccount'
import {Address} from './components/Address'
import {Menus} from './components/Menus'
import MenuBebidas from './components/Menus/MenuBebidas'
import { Pedido } from './components/Pedido'
import SusPedidos from './components/Pedido/SusPedidos'
import {AdminLandingPage} from './components/Admin'
import RoleManager from './components/Admin/RoleManager'
import ArticulosInsumo from './components/Admin/ArticulosInsumo'
import ArticulosManufacturados from './components/Admin/ArticulosManufacturados'
import RankingComidas from './components/Admin/RankingComidas'
import RankingPedido from './components/Admin/RankingPedido'
import Ingresos from './components/Admin/Ingresos'
import Ganancias from './components/Admin/Ganancias'
import CartItems from './context/CartItems'
import UserLogged from './context/UserLogged'
import { Cajero } from './components/Cajero'
import { Cocinero } from './components/Cocinero'

function App() {
  return (
   <BrowserRouter>
   <UserLogged>
   <CartItems>
    <Navbar/>
    <Routes>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createAccount' element={<CreateAccount/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/menus' element={<Menus/>}/>
      <Route path='/bebidas' element={<MenuBebidas/>}/>
      <Route path='/pedido' element={<Pedido/>}/>
            <Route path='/pedido/susPedidos' element={<SusPedidos/>}/>
      <Route path='/admin' element={<AdminLandingPage/>}/>
            <Route path='/admin/users' element={<RoleManager/>}/>
            <Route path='/admin/articulosInsumo' element={<ArticulosInsumo/>}/>
            <Route path='/admin/articulosManufacturados' element={<ArticulosManufacturados/>}/>
            <Route path='/admin/rankingComidas' element={<RankingComidas/>}/>
            <Route path='/admin/rankingPedidos' element={<RankingPedido/>}/>
            <Route path='/admin/ingresos' element={<Ingresos/>}/>
            <Route path='/admin/ganancias' element={<Ganancias/>}/>
      <Route path='/cajero' element={<Cajero/>}/>
      <Route path='/cocinero' element={<Cocinero/>}/>
    </Routes>
    </CartItems>
    </UserLogged>
   </BrowserRouter> 
  )
}

export default App;
