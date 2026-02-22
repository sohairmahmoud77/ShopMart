"use client";
import { useState } from "react";
import { useCart } from "@/context/cart.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreditCard, Truck, Loader2, CheckCircle2, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { getLoggedUserCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("online");
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: "",
  });

  // جلب بيانات السلة للحصول على الـ ID
  const { data: cartResponse } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
  });

  const cartId = cartResponse?.data?._id;

  // 1. الدفع كاش (Cash Order)
  const cashMutation = useMutation({
    mutationFn: (values: typeof shippingAddress) => 
      fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.getItem("userToken")! },
        body: JSON.stringify({ shippingAddress: values }),
      }).then(res => res.json()),
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Order Placed Successfully (Cash)");
        window.location.href = "/allorders"; // تحويل لصفحة الطلبات
      }
    }
  });

  // 2. الدفع أونلاين (Online Payment - Stripe)
  const onlineMutation = useMutation({
    mutationFn: (values: typeof shippingAddress) =>
      fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.getItem("userToken")! },
        body: JSON.stringify({ shippingAddress: values }),
      }).then(res => res.json()),
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.loading("Redirecting to Stripe...");
        window.location.href = data.session.url; // التحويل لصفحة فيزا
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.details || !shippingAddress.phone || !shippingAddress.city) {
      return toast.error("Please fill all fields");
    }
    
    if (paymentMethod === "cash") {
      cashMutation.mutate(shippingAddress);
    } else {
      onlineMutation.mutate(shippingAddress);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Shipping Form */}
        <div className="space-y-10">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">Shipping</h1>
            <p className="text-gray-400 mt-2 font-medium uppercase tracking-widest text-xs">Where should we send your items?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Street Details / Apartment" 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:border-black outline-none transition-all shadow-sm"
                  onChange={(e) => setShippingAddress({...shippingAddress, details: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:border-black outline-none transition-all shadow-sm"
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                />
              </div>
              <input 
                type="text" 
                placeholder="City" 
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:border-black outline-none transition-all shadow-sm"
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
              />
            </div>

            {/* Payment Selection */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <button 
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 bg-white text-gray-400'}`}
              >
                <CreditCard size={24} />
                <span className="font-black text-[10px] uppercase tracking-widest">Pay Online</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'cash' ? 'border-green-600 bg-green-50 text-green-600' : 'border-gray-50 bg-white text-gray-400'}`}
              >
                <Truck size={24} />
                <span className="font-black text-[10px] uppercase tracking-widest">Cash Delivery</span>
              </button>
            </div>

            <button 
              type="submit"
              disabled={cashMutation.isPending || onlineMutation.isPending}
              className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
            >
              {cashMutation.isPending || onlineMutation.isPending ? <Loader2 className="animate-spin" /> : "PLACE ORDER NOW"}
            </button>
          </form>
        </div>

        {/* Right: Order Summary Preview */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-2xl shadow-gray-200/50 lg:sticky lg:top-20">
          <h2 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">Order Review</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400 font-bold uppercase text-[10px]">
              <span>Payment Mode</span>
              <span className="text-black italic">{paymentMethod === 'online' ? 'Stripe Secure' : 'Cash On Delivery'}</span>
            </div>
            <div className="pt-6 border-t border-gray-50 flex justify-between items-baseline">
              <span className="text-xs font-black uppercase text-gray-400">Grand Total</span>
              <span className="text-5xl font-black tracking-tighter italic">{cartResponse?.data?.totalCartPrice || 0} EGP</span>
            </div>
          </div>
          <div className="mt-10 p-6 bg-blue-50/50 rounded-2xl flex items-start gap-4">
            <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
            <p className="text-[10px] text-blue-800 font-medium leading-relaxed uppercase tracking-wider">
              Your order is protected by our secure checkout policy. No hidden fees or extra charges at delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}