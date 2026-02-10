"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../core/axios.config";
import ProductCard from "../components/ProductCard";
import CategorySlider from "@/components/CategorySlider"; 
// Interface TypeScript
interface Product {
  id: string;
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  category: { name: string };
}

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/products");
      return data.data as Product[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Hero Section */}
      <section className="bg-blue-600 rounded-2xl p-8 mb-10 text-white flex flex-col items-center text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Shop the Best Deals!</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Exclusive collection of top brands just for you.
        </p>
      </section>

      {/* 2. Category Slider ( */}
      <CategorySlider />

      {/* 3. Featured Products Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-12">Featured Products</h2>
      
      {/* 4. Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}