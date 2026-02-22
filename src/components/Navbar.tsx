"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Package, ChevronDown, LogIn, UserPlus, ShoppingBag, Menu } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart.context"; 
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { getLoggedUserCart } = useCart();

  const { data: cartResponse } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
  });
  const cartCount = cartResponse?.numOfCartItems || 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("Logged out successfully");
    setIsOpen(false);
    router.push("/login");
  };

  const isAuth = typeof window !== "undefined" && !!localStorage.getItem("userToken");

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-[100]">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* ****/}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
           <div className="bg-black text-white w-9 h-9 flex items-center justify-center font-bold rounded-lg text-xl transition-transform group-hover:rotate-12">S</div>
           <span className="text-2xl font-black tracking-tighter">ShopMart</span>
        </Link>

        {/* **** */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Products", href: "/products" },
            { name: "Brands", href: "/brands" },
            { name: "Categories", href: "/categories" },
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ***** */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-black transition-colors">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <User size={18} strokeWidth={2} />
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Account Access</p>
                  <p className="text-xs font-bold text-gray-900 truncate">My Account</p>
                </div>

                {!isAuth ? (
                  <>
                    <Link 
                      href="/login" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <LogIn size={16} className="text-blue-600" /> Login
                    </Link>
                    <Link 
                      href="/register" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <UserPlus size={16} className="text-blue-600" /> Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/allorders" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <Package size={16} className="text-blue-600" /> My Orders
                    </Link>
                    {/* ****/}
                    <div className="h-px bg-gray-50 my-1 mx-4"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden text-gray-700">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}