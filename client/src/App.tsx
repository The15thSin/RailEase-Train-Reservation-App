import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Login = lazy(() => import('./components/Login/Login')) 
const Register = lazy(() => import('./components/Register/Register')) 
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard')) 
const Landing = lazy(() => import('./components/Landing/Landing'))
const Navbar = lazy(() => import('./components/Navbar/Navbar')) 
const TrainsList = lazy(() => import('./components/TrainsList/TrainsList')) 
const BookingForm = lazy(() => import('./components/BookingForm/BookingForm')) 
const Ticket = lazy(() => import('./components/Ticket/Ticket')) 
import Loading from './components/Loading/Loading'
import './App.css'

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="train-results" element={
        <Suspense fallback={<Loading />}>
          <TrainsList />
        </Suspense>
      } />
      <Route path="book-seat" element={
        <Suspense fallback={<Loading />}>
          <BookingForm />
        </Suspense>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<Loading />}>
            <Landing />
          </Suspense>
        } />
        <Route path='/login' element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        } />
        <Route path='/register' element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        } />
        <Route path='/ticket' element={
          <Suspense fallback={<Loading />}>
            <Ticket />
          </Suspense>
        } />
        <Route path='/dashboard/*' element={
          <>
            <DashboardRoutes />
          </>
        } />
        {/* <Route path='/load' element={<Loading />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
