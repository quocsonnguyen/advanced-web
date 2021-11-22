import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/modules'
import { Layout, RegisterPage } from './components/common'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
