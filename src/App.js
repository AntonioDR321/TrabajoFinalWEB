import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DashboardHeader from './components/DashboardHeader';
import Dashboard from './components/Dashboard';
import Evaluations from './components/Evaluations';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import Users from './components/Users';
import History from './components/History';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import EvaluationDetail from './components/EvaluationDetail';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <Dashboard />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/productos" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <Products />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/productos/:code" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <ProductDetail />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/productos/agregar" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <AddProduct />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/evaluaciones" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <Evaluations />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/evaluaciones/:id" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <EvaluationDetail />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/usuarios" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <Users />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <UserProfile />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <EditProfile />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/historial" element={
            <ProtectedRoute>
              <>
                <DashboardHeader />
                <History />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;