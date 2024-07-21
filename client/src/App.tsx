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
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
import MyBookings from './components/MyBookings/MyBookings'
import PNRStatus from './components/PNRStatus/PNRStatus'
import CancelBooking from './components/CancelBooking/CancelBooking'
import Footer from './components/Footer/Footer'

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
        <Route path='/forgot-password' element={
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        } />
        <Route path='/change-password' element={
          <Suspense fallback={<Loading />}>
            <ChangePassword />
          </Suspense>
        } />
        <Route path='/my-bookings' element={
          <Suspense fallback={<Loading />}>
            <MyBookings />
          </Suspense>
        } />
        <Route path='/check-pnr' element={
          <Suspense fallback={<Loading />}>
            <PNRStatus />
          </Suspense>
        } />
        <Route path='/cancel-ticket' element={
          <Suspense fallback={<Loading />}>
            <CancelBooking />
          </Suspense>
        } />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
