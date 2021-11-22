import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/modules'
import { Layout } from './components/common'


function App() {
  localStorage.setItem('uid', '123456')
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
