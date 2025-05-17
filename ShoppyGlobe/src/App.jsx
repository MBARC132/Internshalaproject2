import React, { Suspense } from 'react';
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const ProductList = React.lazy(() => import("./Components/ProductList"));
const ProductDetail = React.lazy(() => import("./Components/ProductDetail"));
const Cart = React.lazy(() => import("./Components/Cart"));
const NotFound = React.lazy(() => import("./Components/NotFound"));  
const ProductItem = React.lazy(() => import("./Components/ProductItem"));  
const RegisterFrom = React.lazy(() => import("./Components/RegisterForm"));  
const LoginForm = React.lazy(() => import("./Components/LoginForm"));  


function App() {
  return (
    <>
    {/* <div>
      <Header/>
      <h1>Welcome to ShoppyGlobe</h1>
    </div> */}
      <div className="app-container">
      <Header/>
      <div className="main-content">
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/ProductItem" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/RegisterForm" element={<RegisterFrom />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </div>
      </div>
    </>
  )
}

export default App;
