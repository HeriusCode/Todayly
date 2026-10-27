import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';

import Home from './pages/Home';
import Planner from './pages/Planner';
import Tasks from './pages/Tasks';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Places from './pages/Places';
import Outfit from './pages/Outfit';
import Wheel from './pages/Wheel';
import Summary from './pages/Summary';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Journal from './pages/Journal';
import Detail from './pages/Detail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/food" element={<Food />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/places" element={<Places />} />
            <Route path="/outfit" element={<Outfit />} />
            <Route path="/wheel" element={<Wheel />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/favorites" element={<Navigate to="/summary" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/detail/:type/:id" element={<Detail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
