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
import About from './About'
import ChangePass from './ChangePass'
import Test from './Admin/Test'
import NetworkList from './NetworkList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:id?" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/network" element={<Network />} />
        <Route path="/profile/network/list" element={<NetworkList />} />
        <Route path="/profile/password" element={<ChangePass />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/sheet" element={<Sheet />} />
        <Route path="/admin/addusers" element={<Addusers />} />
        <Route path="/admin/network" element={<Graph />} />
        <Route path="/test/add" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}
