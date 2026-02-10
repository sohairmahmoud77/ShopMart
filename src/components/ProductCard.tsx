"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext"; 

interface IProduct {
  id: string;
  _id?: string; 
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: { name: string };
}

export default function ProductCard({ product }: { product: IProduct }) {
  // *****
  const { addToCart } = useCart();

  //***** */
  const productId = product.id || product._id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative">
      
      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:text-red-500 transition-colors z-10">
        <Heart size={18} />
      </button>

      <Link href={`/products/${productId}`} className="flex flex-col h-full">
        <div className="relative h-48 w-full bg-gray-50 p-4">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-3 flex flex-col flex-grow">
          <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            {product.category?.name}
          </p>
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 mt-1">
            {product.title}
          </h3>
          
          <div className="flex justify-between items-center mt-auto pt-3">
            <span className="text-base font-bold text-gray-900">{product.price} EGP</span>
            <div className="flex items-center text-yellow-500 text-xs font-medium">
              <Star size={14} fill="currentColor" className="mr-0.5" />
              <span className="text-gray-600">{product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-3 pt-0">
        {/* addToCart */}
        <button 
          onClick={() => productId && addToCart(productId)}
          className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}