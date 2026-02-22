"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/product.interface"; 

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/api/v1/products"),
    
    select: (res) => res.data.data as Product[],
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-20 text-red-500 font-bold">
      حدث خطأ أثناء تحميل المنتجات، يرجى المحاولة لاحقاً.
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-10 text-gray-900 border-b pb-4 tracking-tighter italic uppercase">
        Explore Products
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
}