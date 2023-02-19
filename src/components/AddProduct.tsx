import React, { useState } from "react";
import axios from "axios";
import { urlGetProducts } from "../endpoints";
import { ProductDTO } from "../interfaces/ProductDTO";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    family: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    axios.post<ProductDTO>(urlGetProducts, values).then((response) => {
      //console.log(response);
      navigate("/");
    }).catch(response=> {
      setError(true);
    }).finally(()=> {
      setLoading(false);
    })
  };

  return (
    <div className="container mt-5">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <Alert key="danger" variant="danger">
          Error al enviar los datos
        </Alert>
      )}
      <Form method="post" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" required placeholder="Descripción" 
          name="description"
          value={values.description}
          onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" required placeholder="Precio" 
           name="price"
           value={values.price}
           onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Familia</Form.Label>
          <Form.Select aria-label="Familia" required 
          name="family"
           value={values.family}
           onChange={handleChange}>
            <option>Seleccione una opción</option>
            <option value="TV">TV</option>
            <option value="Moviles">Moviles</option>
            <option value="Portatiles">Portatiles</option>
            <option value="PCs">PCs</option>
            <option value="Componentes">Componentes</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};
