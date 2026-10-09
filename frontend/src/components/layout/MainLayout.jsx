import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      <main className="flex-1 pt-20">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
