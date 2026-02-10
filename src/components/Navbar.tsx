"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext"; 
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react"; 

export default function Navbar() {
  const { userToken, setUserToken } = useUser();
  const { numOfCartItems } = useCart(); 
  const router = useRouter();

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    router.push("/login");
  }

  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600">ShopMart</Link>
      
      <div className="flex items-center gap-6">
        {userToken && (
          //***** */
          <Link href="/cart" className="relative group">
            <ShoppingCart className="text-gray-600 group-hover:text-blue-600 transition-colors" size={26} />
            {numOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {numOfCartItems}
              </span>
            )}
          </Link>
        )}

        {userToken ? (
          <button onClick={logout} className="text-red-500 font-semibold hover:underline">Logout</button>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-blue-600">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}