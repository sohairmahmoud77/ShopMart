"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold rounded">S</span>
              <h2 className="text-xl font-bold">ShopMart</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Your one-stop destination for the latest technology, fashion, and lifestyle products. 
              Quality guaranteed with fast shipping and excellent customer service.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <p>📍 123 Shop Street, October City, DC 12345</p>
              <p>📞 (+20) 01093333333</p>
              <p>✉️ support@shopmart.com</p>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold mb-6 uppercase text-sm tracking-wider">Shop</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
              <li className="hover:text-blue-600 cursor-pointer">Fashion</li>
              <li className="hover:text-blue-600 cursor-pointer">Home & Garden</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 uppercase text-sm tracking-wider">Customer Service</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Track Your Order</li>
              <li className="hover:text-blue-600 cursor-pointer">Size Guide</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 uppercase text-sm tracking-wider">Policies</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-blue-600 cursor-pointer">Refund Policy</li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-50 pt-8 text-center text-gray-400 text-xs">
          © 2026 ShopMart Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}