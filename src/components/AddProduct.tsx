import React, { useState, useRef } from "react";
import axios from "axios";
import { urlGetProducts } from "../endpoints";
import { ProductDTO } from "../interfaces/ProductDTO";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { Toast } from "primereact/toast";

export const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    family: "",
  });

  const toast = useRef<Toast>(null);

  const [selectedFamily, setSelectedFamily] = useState("");

  const families = [
    { name: "TV", code: "TV" },
    { name: "Moviles", code: "Moviles" },
    { name: "Portatiles", code: "Portatiles" },
    { name: "PCs", code: "PCs" },
    { name: "Componentes", code: "Componentes" },
  ];

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeNumeric = (e: any) => {
    setValues((values) => ({
      ...values,
      ["price"]: e.value,
    }));
  };

  const handleChangeList = (e: any) => {
    setSelectedFamily(e);
    setValues((values) => ({
      ...values,
      ["family"]: e.code,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //Guardar las familias

    console.log(values);
    setError(false);
    setLoading(true);
    axios
      .post<ProductDTO>(urlGetProducts, values)
      .then((response) => {
        //console.log(response);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Datos insertados correctamente",
          life: 3000,
        });
        navigate("/");
      })
      .catch((response) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error",
          life: 3000,
        });
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      {loading && (
        <div className="text-center">
          <ProgressSpinner />
        </div>
      )}
      <Toast ref={toast}/>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mt-5">
          <span className="p-float-label">
            <InputText
              id="name"
              aria-describedby="name-help"
              required
              placeholder="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="formulario"
            />
            <label htmlFor="name">Nombre</label>
          </span>
        </div>
        <div className="mt-5">
          <span className="p-float-label">
            <InputText
              id="description"
              aria-describedby="description-help"
              required
              placeholder="Descripcion"
              name="description"
              value={values.description}
              onChange={handleChange}
              className="formulario"
            />
            <label htmlFor="description">Descripcion</label>
          </span>
        </div>
        <div className="mt-5">
          <InputNumber
            id="price"
            aria-describedby="price-help"
            required
            currency="EUR"
            locale="es-ES"
            name="price"
            value={values.price}
            onChange={handleChangeNumeric}
            className="formulario"
          />
        </div>

        <div className="mt-5">
          <Dropdown
            options={families}
            name="family"
            required={true}
            optionLabel="name"
            editable
            placeholder="Seleccione familia"
            value={selectedFamily}
            onChange={(e) => handleChangeList(e.value)}
            className="formulario"
          />
        </div>

        <div className="mt-5">
          <Button type="submit" label="Guardar" />
        </div>
      </form>
    </div>
  );
};
