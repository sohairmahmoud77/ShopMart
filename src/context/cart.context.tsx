"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axiosInstance from "@/core/axios.config";
import toast from "react-hot-toast";

interface CartContextType {
  cartId: string | null;
  cartData: any;
  numOfCartItems: number; 
  addToCart: (productId: string) => Promise<void>;
  getLoggedUserCart: () => Promise<any>;
  removeItem: (productId: string) => Promise<void>;
  updateCount: (productId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkOut: (cartId: string, shippingAddress: any) => Promise<any>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartData, setCartData] = useState<any>(null);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);

  //
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userToken");
    }
    return null;
  };

  // 
  const getLoggedUserCart = async () => {
    const token = getToken();
    if (!token) return null; 

    try {
      const { data } = await axiosInstance.get("/api/v1/cart", {
        headers: { token },
      });
      if (data.status === "success") {
        setCartId(data.data._id);
        setCartData(data.data);
        setNumOfCartItems(data.numOfCartItems);
      }
      return data; 
    } catch (error: any) {
      // لو السلة فاضية الـ API ساعات بيرجع 404، لازم نعالجها عشان React Query ميعلقش
      if (error.response?.status === 404) {
        setCartData(null);
        setNumOfCartItems(0);
      }
      return null; 
    }
  };

  // 
  useEffect(() => {
    if (getToken()) {
      getLoggedUserCart();
    }
  }, []);

  //
  const addToCart = async (productId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first 🔑");
        return;
      }
      
      const { data } = await axiosInstance.post(
        "/api/v1/cart",
        { productId },
        { headers: { token } }
      );
      
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartData(data.data);
        toast.success("Added to cart 🛒");
        await getLoggedUserCart(); 
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // 
  const removeItem = async (productId: string) => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/cart/${productId}`, {
        headers: { token: getToken() },
      });
      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // 
  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return removeItem(productId);
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/cart/${productId}`,
        { count },
        { headers: { token: getToken() } }
      );
      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  //
  const clearCart = async () => {
    try {
      await axiosInstance.delete("/api/v1/cart", {
        headers: { token: getToken() },
      });
      setCartData(null);
      setCartId(null);
      setNumOfCartItems(0);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  // 6. الدفع
  const checkOut = async (cartId: string, shippingAddress: any) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress },
        { headers: { token: getToken() } }
      );
      return data;
    } catch (error) {
      console.error("Checkout Error", error);
      toast.error("Checkout failed");
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartId, 
        cartData, 
        numOfCartItems,
        addToCart, 
        getLoggedUserCart, 
        removeItem, 
        updateCount, 
        clearCart,
        checkOut 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};