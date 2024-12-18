import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Network from './Network'
import Admin from './Admin/Admin'
import Sheet from './Admin/Sheet'
import Addusers from './Admin/Addusers'
import Graph from './Admin/Graph'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/sheet" element={<Sheet />} />
        <Route path="/admin/addusers" element={<Addusers />} />
        <Route path="/admin/network" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  )
}
