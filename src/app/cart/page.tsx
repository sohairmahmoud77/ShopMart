"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/context/cart.context";
import Image from "next/image";
import Link from "next/link"; 
import { Trash2, Plus, Minus, Loader2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { getLoggedUserCart, removeItem, updateCount, clearCart } = useCart();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
  });

  const deleteMutation = useMutation({
    mutationFn: removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, count }: { id: string; count: number }) => updateCount(id, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Bag cleared");
    },
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div className="relative">
        <Loader2 className="animate-spin text-blue-600" size={60} strokeWidth={1} />
        <ShoppingBag className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black" size={20} />
      </div>
    </div>
  );

  const cartData = data?.data;

  if (!cartData || cartData.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white min-h-screen px-6 text-center">
        <div className="w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center mb-10 relative">
          <ShoppingBag size={120} className="text-slate-200" strokeWidth={0.5} />
          <div className="absolute top-10 right-10 animate-bounce">
            <Sparkles className="text-yellow-400" size={32} />
          </div>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Your Bag is Empty</h2>
        <p className="text-gray-400 max-w-xs mb-10 font-medium italic text-lg">"Fashion fades, only style remains the same."</p>
        <Link href="/" className="bg-blue-600 text-white px-14 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black transition-all duration-500 shadow-2xl shadow-blue-200">
          Discover Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7f9] min-h-screen pb-24">
      {/* Top Banner */}
      <div className="bg-black text-white py-3 text-center overflow-hidden">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          Free Worldwide Shipping on Orders Over 5000 EGP
        </p>
      </div>

      <div className="container mx-auto px-6 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none flex items-center gap-4">
              My Bag <span className="text-blue-600 font-serif text-5xl">({cartData.products.length})</span>
            </h1>
            <p className="text-slate-400 mt-4 font-bold uppercase tracking-[0.2em] text-xs">Curated Selection</p>
          </div>
          <button 
            onClick={() => clearMutation.mutate()}
            className="px-8 py-3 bg-white border border-slate-200 rounded-full text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm"
          >
            Clear Entire Bag
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Products List */}
          <div className="lg:col-span-8 space-y-6">
            {cartData.products.map((item: any) => (
              <div key={item.product._id} className="group relative flex flex-col sm:flex-row items-center gap-8 bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden">
                
                {/* Image Section - Vibrant & Glowing */}
                <div className="relative w-56 h-56 shrink-0 rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 to-white group-hover:from-blue-50 transition-colors duration-500">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
                  <Image 
                    src={item.product.imageCover} 
                    alt={item.product.title} 
                    fill 
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-[1.5s] ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]" 
                  />
                </div>

                {/* Details Section */}
                <div className="flex-grow w-full py-4 px-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-blue-600 font-black text-[9px] uppercase tracking-[0.3em] mb-2 block">{item.product.category?.name}</span>
                      <h3 className="font-black text-2xl text-slate-900 leading-[1.1] tracking-tight hover:text-blue-600 transition-colors cursor-default">{item.product.title}</h3>
                    </div>
                    <button onClick={() => deleteMutation.mutate(item.product._id)} className="text-slate-200 hover:text-red-500 transition-colors p-2 bg-slate-50 rounded-full group/del">
                      <Trash2 size={18} className="group-hover/del:scale-110 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1">
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price Value</p>
                       <p className="text-3xl font-black text-black tracking-tighter italic leading-none">{item.price} <span className="text-[10px] not-italic text-slate-400 font-bold uppercase tracking-widest ml-1">EGP</span></p>
                    </div>
                    
                    {/* Modern Counter */}
                    <div className="flex items-center gap-4 bg-slate-900 text-white p-2 rounded-2xl shadow-xl">
                      <button 
                        onClick={() => updateMutation.mutate({ id: item.product._id, count: item.count - 1 })}
                        disabled={item.count <= 1}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all disabled:opacity-20"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="font-black text-xl min-w-[30px] text-center font-mono">{item.count}</span>
                      <button 
                        onClick={() => updateMutation.mutate({ id: item.product._id, count: item.count + 1 })}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary - High Contrast */}
          <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-white">
              <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase italic text-slate-900 border-b border-slate-50 pb-6">Summary</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400 uppercase text-[10px] tracking-[0.2em]">Selected Items</span>
                  <span className="text-slate-900">{cartData.products.length} Units</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400 uppercase text-[10px] tracking-[0.2em]">Shipping</span>
                  <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Free</span>
                </div>
                
                <div className="pt-10 mt-6 border-t-2 border-slate-50 relative">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Grand Total</span>
                    <div className="text-right">
                      <p className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">{cartData.totalCartPrice}</p>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-3">Egyptian Pounds</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/checkout" 
                className="group relative w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-black text-xl text-center block overflow-hidden transition-all hover:bg-black hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95"
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  CHECKOUT NOW <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
                </div>
              </Link>
              
              <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Encrypted Security</span>
                </div>
                <div className="flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}