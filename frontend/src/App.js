import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage, ManagePage } from './components/modules'
import { RegisterPage, MainPage, Notification } from './components/common'
import { useNavigate } from 'react-router-dom'
import Authorize from './components/common/AuthorizePage/authorize'

function App() {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}
          render={() => {
            if (!localStorage.getItem('user')) {
              navigate('/login')
            }
          }}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </>
  );
}

export default App;
