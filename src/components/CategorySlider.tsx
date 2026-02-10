"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../core/axios.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";

interface ICategory {
  _id: string;
  name: string;
  image: string;
}

export default function CategorySlider() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/categories");
      console.log("Categories fetched:", data.data); 
      return data.data as ICategory[];
    },
  });

  if (isLoading) return <div className="h-20 bg-gray-50 animate-pulse rounded-xl mb-8"></div>;

  return (

  <section className="my-10">
    <h2 className="text-xl font-bold mb-5 text-gray-800">Shop by Category</h2>
    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar"> 
        
      {/*(Scroll) */}
      {data?.map((category: ICategory) => (
        <div key={category._id} className="min-w-[150px] flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border">
            <img src={category.image} className="w-full h-full object-cover" alt="" />
          </div>
          <p className="text-sm mt-2">{category.name}</p>
        </div>
      ))}
    </div>
  </section>
);
}