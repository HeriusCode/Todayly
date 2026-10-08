import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Favorites from './pages/Favorites';
import Food from './pages/Food';
import Home from './pages/Home';
import Login from './pages/Login';
import Outfit from './pages/Outfit';
import Places from './pages/Places';
import Planner from './pages/Planner';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="food" element={<Food />} />
        <Route path="places" element={<Places />} />
        <Route path="outfit" element={<Outfit />} />
        <Route path="planner" element={<Planner />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
