import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import Navbar from './components/Navbar/Navbar'
import TrainsList from './components/TrainsList/TrainsList'

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="train-results" element={<TrainsList />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <Landing />
        } />
        <Route path='/login' element={
          <>
            <Login />
          </>
        } />
        <Route path='/register' element={
          <>
            <Register />
          </>
        } />
        <Route path='/dashboard/*' element={<DashboardRoutes />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
