import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import Register from './routes/register/register.component';
import { UserContext } from "./contexts/user.context";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';



const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route
          path="auth"
          element={
            currentUser ? <Navigate to="/" replace /> : <Authentication />
          }
        />
        <Route path='checkout' element={<Checkout />}/>
      </Route>
    </Routes>
  );
};

export default App;