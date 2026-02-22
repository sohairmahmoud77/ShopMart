"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Product } from "@/interfaces/product.interface";
import { useCart } from "@/context/cart.context"; 

export default function ProductCard({ product }: { product: Product }) {
  // 
  const { addToCart } = useCart();

  //
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    await addToCart(product._id); 
  };

 
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Added to wishlist:", product._id);
   
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg relative flex flex-col h-full">
      
      <Link href={`/products/${product._id}`} className="flex flex-col h-full">
        
        {/* *****/}
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-[#f9f9f9]">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* */}
        <div className="flex flex-col flex-grow">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            {product.category?.name || "General"}
          </span>

          <h3 className="text-gray-800 font-bold text-sm leading-tight mb-2 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/*****/}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < Math.floor(product.ratingsAverage) ? "currentColor" : "none"} 
                  className={i < Math.floor(product.ratingsAverage) ? "" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400">({product.ratingsAverage})</span>
          </div>

          {/*****/}
          <div className="mt-auto">
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-xs font-bold text-gray-400">EGP</span>
               <span className="text-xl font-black text-gray-900">
                 {product.price.toLocaleString()}
               </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-[#1a1a1a] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all text-xs font-bold active:scale-95 shadow-sm"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
              
              <button 
                onClick={handleAddToWishlist}
                className="p-3 border border-gray-100 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all active:scale-90"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}