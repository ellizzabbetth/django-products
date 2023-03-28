// import React from 'react';
// import { createRoot } from 'react-dom/client';

// import App from './App';

// const root = createRoot(document.getElementById("root"));
// root.render(<App />);


import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);