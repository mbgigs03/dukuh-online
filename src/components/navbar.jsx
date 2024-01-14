
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Selamat Datang</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white">Beranda</a>
            <a href="#" className="text-white">Tentang Kami</a>
            <a href="#" className="text-white">Kontak</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;