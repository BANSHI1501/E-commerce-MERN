import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-200 mt-14">
      <div className="container mx-auto p-4">
        <div className="flex justify-center space-x-6">
          <a href="/about" className="text-red-500 font-bold hover:text-red-700">About</a>
          <a href="/contact" className="text-green-500 font-bold hover:text-green-700">Contact</a>
          <a href="/privacy" className="text-blue-500 font-bold hover:text-blue-700">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
