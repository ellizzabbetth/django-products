
import React from 'react';
//i-mport { render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import axios from "axios";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";

axios.defaults.baseURL = 'http://localhost:8000/api/admin'; // TODO
axios.defaults.withCredentials = true;

//const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>

          <App />
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  //rootElement
);