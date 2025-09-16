import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">My Store</h2>
          <p className="text-gray-300">Providing quality products since 2023.</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-8 text-sm">
        &copy; {new Date().getFullYear()} My Store | All Rights Reserved
      </div>
    </footer>
  );
};

export default SiteFooter;