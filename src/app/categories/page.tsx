"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import Link from "next/link";
import Image from "next/image";
import { Loader2, LayoutGrid } from "lucide-react";

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/categories");
      return data.data;
    },
  });

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-black" size={40} />
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-black p-3 rounded-2xl text-white">
          <LayoutGrid size={24} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Categories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((category: any) => (
          <Link 
            href={`/categories/${category._id}`} 
            key={category._id} 
            className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-gray-100"
          >
            <Image 
              src={category.image} 
              alt={category.name} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <h3 className="text-white font-black text-2xl uppercase">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}