import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; 
import ShopContextProvider from './context/shopContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
  </BrowserRouter>
);
