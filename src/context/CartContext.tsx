"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "@/core/axios.config";
import { useUser } from "./UserContext";

// --- (Interfaces) ---

interface CartItem {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    id: string;
  };
}

interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    totalCartPrice: number;
    products: CartItem[];
  };
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface CheckoutResponse {
  status: string;
  session: {
    url: string;
  };
}

interface CartContextType {
  cartDetails: CartResponse | null; 
  setCartDetails: React.Dispatch<React.SetStateAction<CartResponse | null>>; 
  addToCart: (productId: string) => Promise<void>;
  numOfCartItems: number;
  getCart: () => Promise<CartResponse | undefined>;
  removeItem: (productId: string) => Promise<CartResponse | undefined>;
  updateQuantity: (productId: string, count: number) => Promise<CartResponse | undefined>;
  checkOut: (cartId: string, shippingAddress: ShippingAddress) => Promise<CheckoutResponse | undefined>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState<CartResponse | null>(null);
  const { userToken } = useUser();

  // ****/
  async function addToCart(productId: string) {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/cart`,
        { productId },
        { headers: { token: userToken } }
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        alert("Product added to cart successfully! 🚀");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product. Make sure you are logged in!");
    }
  }

  // ****/
  async function getCart(): Promise<CartResponse | undefined> {
    try {
      const { data } = await axiosInstance.get(`/api/v1/cart`, {
        headers: { token: userToken },
      });
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data as CartResponse); 
      return data as CartResponse;
    } catch (error) {
      console.error("Get Cart Error:", error);
      return undefined;
    }
  }

  // ***
  async function removeItem(productId: string): Promise<CartResponse | undefined> {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/cart/${productId}`, {
        headers: { token: userToken },
      });
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data as CartResponse); 
      return data as CartResponse;
    } catch (error) {
      console.error("Remove Item Error:", error);
      return undefined;
    }
  }

  // ***/
  async function updateQuantity(productId: string, count: number): Promise<CartResponse | undefined> {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/cart/${productId}`,
        { count },
        { headers: { token: userToken } }
      );
      setCartDetails(data as CartResponse); 
      return data as CartResponse;
    } catch (error) {
      console.error("Update Quantity Error:", error);
      return undefined;
    }
  }

  //   الدفع أونلاين
  async function checkOut(
    cartId: string, 
    shippingAddress: ShippingAddress
  ): Promise<CheckoutResponse | undefined> {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress },
        { headers: { token: userToken } }
      );
      return data as CheckoutResponse;
    } catch (error) {
      console.error("Checkout error:", error);
      return undefined;
    }
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartDetails,     
        setCartDetails,   
        addToCart, 
        numOfCartItems, 
        getCart, 
        removeItem, 
        updateQuantity, 
        checkOut 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};