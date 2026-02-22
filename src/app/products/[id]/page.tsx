"use client";
import React, { use } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart.context"; 
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import { Loader2, ShoppingCart, Star, CheckCircle2 } from "lucide-react";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
      return data.data;
    },
  });

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-black" size={40} />
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* القسم الأيسر: الصور */}
        <div className="space-y-4 sticky top-24">
          <div className="bg-[#f9f9f9] rounded-[2.5rem] p-8 border border-gray-50 flex items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-square">
              <Image 
                src={product.imageCover} 
                alt={product.title} 
                fill
                priority
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          {/* عرض الصور الفرعية إن وجدت */}
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img: string, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-2 border border-gray-100 aspect-square relative overflow-hidden">
                <Image src={img} alt="gallery" fill className="object-contain p-2" />
              </div>
            ))}
          </div>
        </div>

        {/* القسم الأيمن: البيانات */}
        <div className="pt-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4 uppercase tracking-widest">
            <CheckCircle2 size={16} />
            <span>{product.category?.name}</span>
            <span className="text-gray-300 mx-2">/</span>
            <span className="text-gray-500">{product.brand?.name}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1]">
            {product.title}
          </h1>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20">
              <Star className="text-yellow-500 fill-yellow-500" size={18} />
              <span className="font-bold text-yellow-700">{product.ratingsAverage}</span>
            </div>
            <span className="text-gray-400 font-medium">{product.ratingsQuantity} Global Ratings</span>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-12">
            <span className="text-5xl font-black text-black tracking-tighter">{product.price}</span>
            <span className="text-2xl font-bold text-gray-400 uppercase">EGP</span>
          </div>

          <button 
            onClick={() => addToCart(product._id)}
            className="group w-full max-w-md bg-black text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-gray-200"
          >
            <ShoppingCart size={24} className="group-hover:translate-x-1 transition-transform" />
            Add to Shopping Bag
          </button>
        </div>
      </div>
    </div>
  );
}