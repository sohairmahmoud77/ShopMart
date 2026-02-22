"use client";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import ProductCard from "@/components/ProductCard";
import { Loader2, LayoutGrid } from "lucide-react";

export default function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // جلب المنتجات المفلترة بالبراند
  const { data: products, isLoading } = useQuery({
    queryKey: ["brandProducts", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/products?brand=${id}`);
      return data.data;
    },
  });

  if (isLoading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="container mx-auto px-6 py-16">
      <header className="mb-12 flex items-center gap-4">
        <div className="bg-black p-3 rounded-2xl text-white">
          <LayoutGrid size={24} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Brand Collection</h2>
      </header>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold italic text-lg">No products found in this brand yet.</p>
        </div>
      )}
    </div>
  );
}