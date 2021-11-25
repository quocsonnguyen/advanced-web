import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/modules'
import { Layout, RegisterPage } from './components/common'
import { useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}
          render={() => {
            if (!localStorage.getItem('user')) {
              navigate('/login')
            }
          }}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
