import React from 'react'
import { Routes, Route, NavLink, Link, BrowserRouter } from 'react-router-dom'
import { Products } from '../components/Products'
import { Form } from '../components/Form'
import { Error } from '../components/Error'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Router = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Productos</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/addproduct" >
              Agregar Producto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={ <Products/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/addproduct' element={<Form/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}