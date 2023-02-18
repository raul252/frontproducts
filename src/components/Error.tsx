import React from "react";

export const Error = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">404</span> Página no encontrada.
          </p>
          <a href="index.html" className="btn btn-primary">
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
};