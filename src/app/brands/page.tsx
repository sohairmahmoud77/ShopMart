"use client";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/axios.config";
import Link from "next/link";
import Image from "next/image";

export default function BrandsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/brands");
      return data.data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-black mb-12">Shop by Brand</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((brand: any) => (
          <Link href={`/brands/${brand._id}`} key={brand._id} className="group bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl transition-all text-center">
            <div className="relative h-20 w-full mb-4">
              <Image src={brand.image} alt={brand.name} fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <p className="font-bold text-gray-800">{brand.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}