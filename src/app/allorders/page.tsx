"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Package, CheckCircle2, Clock, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function AllOrdersPage() {
  const [userId, setUserId] = useState<string | null>(null);

  //
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUserId(decoded.id);
        } catch (error) {
          console.error("Token decoding failed:", error);
        }
      }
    }
  }, []);

  // 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allOrders", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      return res.data;
    },
    enabled: !!userId, 
  });

  // 
  if (isLoading || (!userId && !isError)) return (
    <div className="flex flex-col justify-center items-center h-screen bg-white gap-4">
      <Loader2 className="animate-spin text-blue-600" size={50} strokeWidth={1} />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Syncing your history...</p>
    </div>
  );

  // 
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white min-h-screen text-center px-6">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
           <Package size={60} className="text-gray-200" strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">No Orders</h2>
        <p className="text-gray-400 mt-4 mb-10 max-w-xs font-medium italic uppercase text-[10px] tracking-widest">Your account has no previous transaction records.</p>
        <Link href="/products" className="bg-black text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-2xl">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 pt-28">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none text-gray-900">Orders</h1>
            <div className="flex items-center gap-3">
               <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
               <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Purchase History</p>
            </div>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
             <span className="text-xs font-black uppercase tracking-widest text-gray-400">Items: </span>
             <span className="text-lg font-black italic text-blue-600">{data.length}</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-10">
          {data.map((order: any) => (
            <div key={order._id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500">
              
              {/* Order Banner */}
              <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-6">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 border border-gray-100">
                       <Clock size={18}/>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Order Date</p>
                      <p className="font-black text-xs uppercase tracking-tighter text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-l border-gray-200 pl-10 hidden sm:flex">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 border border-gray-100">
                       <MapPin size={18}/>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Ship to</p>
                      <p className="font-black text-xs uppercase tracking-tighter text-gray-800">{order.shippingAddress?.city || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${order.isPaid ? 'bg-green-50 border-green-100 text-green-600' : 'bg-yellow-50 border-yellow-100 text-yellow-600'}`}>
                      {order.isPaid ? 'Payment Confirmed' : 'Payment Pending'}
                   </span>
                   <span className="px-4 py-2 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {order.isDelivered ? 'Archived' : 'Processing'}
                   </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.cartItems.map((item: any) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 rounded-3xl border border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="relative w-20 h-20 bg-white rounded-2xl overflow-hidden shrink-0 border border-gray-100 p-2">
                        <Image 
                          src={item.product.imageCover} 
                          alt={item.product.title} 
                          fill 
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-[11px] text-gray-900 uppercase tracking-tight truncate">{item.product.title}</h4>
                        <p className="text-[10px] font-bold text-blue-600 mt-1">
                          {item.price} EGP <span className="text-gray-300 ml-2">Qty: {item.count}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Section */}
                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-end">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Tag size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest italic tracking-wider">Ref: {order._id.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle2 size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Authenticated Transaction</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Settlement</p>
                      <h3 className="text-5xl font-black tracking-tighter italic text-gray-900">
                        {order.totalOrderPrice} 
                        <span className="text-sm not-italic font-bold ml-2">EGP</span>
                      </h3>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}