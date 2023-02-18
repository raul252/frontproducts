import axios, { AxiosResponse } from 'axios';
import React, {useEffect} from 'react';
import {urlGetProducts} from './endpoints';
import { Router } from './routers/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  /*useEffect(() => {
    axios.get(urlGetProducts).then((resp: AxiosResponse<any>)=>{
      console.log(resp.data);
    })
  }, []);*/

  return (
    <>
    <Router></Router>
    </>
  );
}

export default App;