"use client";
import React from "react";
import { useFormik } from "formik";
import { useCart } from "@/context/CartContext";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { cartDetails, checkOut } = useCart();

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      if (cartDetails?.data?._id) {
        const res = await checkOut(cartDetails.data._id, values);
        
        if (res?.status === "success" && res.session?.url) {
          window.location.href = res.session.url;
        } else {
          alert("Failed to create checkout session. Please try again.");
        }
      }
    },
  });

  return (
    <div className="container mx-auto p-10 max-w-2xl bg-white shadow-xl rounded-3xl mt-10 border border-gray-100">
      <h1 className="text-4xl font-black mb-8 text-gray-900 tracking-tight">Shipping Details</h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Street Details</label>
          <input 
            name="details" 
            type="text" 
            onChange={formik.handleChange} 
            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all" 
            placeholder="e.g. 123 Nile Street, Building 4"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Phone Number</label>
            <input 
              name="phone" 
              type="tel" 
              onChange={formik.handleChange} 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
              placeholder="01xxxxxxxxx"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">City</label>
            <input 
              name="city" 
              type="text" 
              onChange={formik.handleChange} 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
              placeholder="e.g. Cairo"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {formik.isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Pay with Credit Card 💳"
          )}
        </button>
      </form>
      
      <p className="text-center text-gray-400 text-xs mt-6">
        You will be redirected to Stripe for secure payment processing.
      </p>
    </div>
  );
}