import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlGetProducts } from "../endpoints";
import Table from "react-bootstrap/Table";
import { ProductDTO } from "../interfaces/ProductDTO";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from "primereact/inputtext";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const Products = () => {
  const [data, setData] = useState<ProductDTO[]>([]);
  const [orginalData, setOriginalData] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<ProductDTO>({
    id: 0,
    name: "",
    description: "",
    price: "",
    family: "",
  });

  const handleClose = () => setShow(false);
  const selectProduct = (p: ProductDTO) => {
    setProduct(p);
    setShow(true);
  };

  const handleSearch = (e: any) => {
    if (e.target.value !== '') {
      const filterdata = data.filter((item)=>{
        return item.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
        item.description.toLowerCase().includes(e.target.value.toLowerCase())
      });
      setData(filterdata);
    } else {
      setData(orginalData);
    }
  };


  useEffect(() => {
    setLoading(true);
    axios.get<ProductDTO[]>(urlGetProducts).then((resp) => {
      //console.log(resp.data);
      setData(resp.data);
      setOriginalData(resp.data);
      setLoading(false);
    }).catch(response=> {
    }).finally(()=> {
      setLoading(false);
    })
  }, []);
  return (
    <div className="container mt-5">
      {loading && (
         <div className="text-center">
         <ProgressSpinner />
      </div>
      )}
      <div>
      <div className="mb-3">
        <span className="p-float-label">
          <InputText id="username" onChange={handleSearch} />
          <label htmlFor="username">Buscar</label>
        </span>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: ProductDTO) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <th>
                  <Button variant="secondary" onClick={() => selectProduct(p)}>
                    Ver
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Producto Seleccionado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset disabled>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={product.name && product.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={product.description && product.description}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={product.price && product.price}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Familia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={product.family && product.family}
                  />
                </Form.Group>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
