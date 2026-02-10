"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import { Star, ShoppingCart, Loader2 } from "lucide-react"; 
import { useCart } from "@/context/CartContext"; 

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart(); 

  const { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* ****/}
        <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img 
            src={data?.imageCover} 
            alt={data?.title} 
            className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* ****/}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{data?.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{data?.description}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-blue-600">{data?.price} EGP</span>
            <div className="flex items-center text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <Star size={18} fill="currentColor" />
              <span className="ml-1 font-bold">{data?.ratingsAverage}</span>
            </div>
          </div>

          {/********/}
          <button 
            onClick={() => addToCart(data?._id)} 
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          
          <p className="mt-4 text-sm text-gray-400 text-center italic">
            Free delivery on orders over 1000 EGP
          </p>
        </div>
      </div>
    </div>
  );
}