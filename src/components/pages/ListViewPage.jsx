import React from 'react';
import Navbar from '@/components/organisms/Navbar.jsx';
import Footer from '@/components/organisms/Footer.jsx';
import ListView from '../ListView.jsx';

export default function ListViewPage() {
  return (
    <div className="bg-[#181A1C] text-white font-lato min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Redux/API Demo: ListView</h1>
        <ListView />
      </div>
      <Footer />
    </div>
  );
}
