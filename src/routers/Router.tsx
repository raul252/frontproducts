import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Products } from '../components/Products'
import { AddProduct } from '../components/AddProduct'
import { Error } from '../components/Error'
import { Menubar } from 'primereact/menubar';
import {useNavigate} from "react-router-dom";


export const Router = () => {

  const navigate = useNavigate();

  const items = [
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-file',
      command: () => {navigate('/') }
    },
    {
      label: 'Añadir Producto',
      icon: 'pi pi-fw pi-file',
      command: () => {navigate('/addproduct') }
    }
];
  return (
    <>
      <div className="card">
            <Menubar model={items} />
        </div>
      <Routes>
        <Route path='/' element={ <Products/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='*' element={<Error/>} />
      </Routes>

    </>
  )
}