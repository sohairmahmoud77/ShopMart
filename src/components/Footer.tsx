"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 text-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/*********/}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold rounded">S</div>
              <h2 className="text-xl font-bold tracking-tight">ShopMart</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Your one-stop destination for the latest technology, fashion, and lifestyle products. 
              Quality guaranteed with fast shipping and excellent customer service.
            </p>
            
            {/*******/}
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span>(+20) 01093333333</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>

          {/******/}
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">Shop</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Electronics</li>
              <li className="hover:text-black cursor-pointer transition-colors">Fashion</li>
              <li className="hover:text-black cursor-pointer transition-colors">Home & Garden</li>
              <li className="hover:text-black cursor-pointer transition-colors">Sports</li>
              <li className="hover:text-black cursor-pointer transition-colors">Deals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">Customer Service</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-black cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-black cursor-pointer transition-colors">Track Your Order</li>
              <li className="hover:text-black cursor-pointer transition-colors">Returns & Exchanges</li>
              <li className="hover:text-black cursor-pointer transition-colors">Size Guide</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">About</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">About shopmart</li>
              <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-black cursor-pointer transition-colors">Press</li>
              <li className="hover:text-black cursor-pointer transition-colors">Investor Relations</li>
              <li className="hover:text-black cursor-pointer transition-colors">Sustainability</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest">Policies</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-black cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-black cursor-pointer transition-colors">Cookie Policy</li>
              <li className="hover:text-black cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-black cursor-pointer transition-colors">Refund Policy</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}