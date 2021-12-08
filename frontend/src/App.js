import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage, ManagePage, WallPage, ProfilePage } from './components/modules'
import { RegisterPage, MainPage, Notification } from './components/common'
import Authorize from './components/common/AuthorizePage/authorize'
import io from 'socket.io-client'
const socket = io()


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/wall/u/:uid" element={<WallPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export {
  App,
  socket
} ;
