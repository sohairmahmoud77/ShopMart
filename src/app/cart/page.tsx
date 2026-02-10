"use client";
import React, { useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  
  const { getCart, removeItem, updateQuantity, cartDetails } = useCart();
  const [loading, setLoading] = React.useState(true);

 
  const displayCart = useCallback(async () => {
    try {
      await getCart();
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, [getCart]);

  useEffect(() => {
    displayCart();
  }, [displayCart]);

  // 
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!cartDetails || cartDetails.numOfCartItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 animate-fade-in">
        <div className="bg-gray-50 p-8 rounded-full mb-6">
          <ShoppingBag size={80} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 mt-2">Looks like you haven&apos;t added anything yet.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          Start Shopping Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-4xl font-black mb-10 text-gray-900 tracking-tight">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartDetails.data.products.map((item) => (
            <div 
              key={item.product._id} 
              className="group flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-28 h-28 bg-gray-50 rounded-2xl p-2 flex-shrink-0">
                  <img 
                    src={item.product.imageCover} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                    alt={item.product.title} 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{item.product.title}</h3>
                  <p className="text-blue-600 font-black text-xl mt-1">{item.price} EGP</p>
                  <button 
                    onClick={() => removeItem(item.product._id)} 
                    className="text-red-400 hover:text-red-600 text-sm font-medium flex items-center gap-1.5 mt-4 transition-colors group/trash"
                  >
                    <Trash2 size={16} /> Remove item
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-6 sm:mt-0 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => updateQuantity(item.product._id, item.count - 1)} 
                  className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-30"
                  disabled={item.count <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="font-black text-lg w-6 text-center text-gray-700">{item.count}</span>
                <button 
                  onClick={() => updateQuantity(item.product._id, item.count + 1)} 
                  className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg hover:bg-green-50 hover:text-green-600 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Order Summary</h2>
            <div className="space-y-5">
              <div className="flex justify-between text-gray-400">
                <span>Total Items</span>
                <span className="font-bold text-white text-lg">{cartDetails.numOfCartItems}</span>
              </div>
              <div className="flex justify-between text-3xl font-black border-t border-white/10 pt-6 mt-6">
                <span>Total</span>
                <span className="text-blue-400">{cartDetails.data.totalCartPrice} <span className="text-xs">EGP</span></span>
              </div>
            </div>
            
            {/* ***/}
            <Link href="/checkout">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl mt-10 font-bold text-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}