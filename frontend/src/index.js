
import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import axios from "axios";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";


axios.defaults.baseURL = 'http://localhost:8000/api/admin'; // TODO
axios.defaults.withCredentials = true;

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <ProductsProvider>

      <App />
      </ProductsProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);