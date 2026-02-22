"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/core/axios.config";

// 
interface AuthResponse {
  message: string;
  statusMsg?: string;
  token?: string;
  status?: string;
}

interface UserContextType {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  verifyResetCode: (resetCode: string) => Promise<AuthResponse>;
  resetPassword: (email: string, newPassword: string) => Promise<AuthResponse>;
  updatePassword: (values: object) => Promise<AuthResponse>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // 
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("userToken");
      if (savedToken) {
        const timeoutId = setTimeout(() => {
          setUserToken(savedToken);
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/api/v1/auth/forgotPasswords", { email });
    return data;
  };

  const verifyResetCode = async (resetCode: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/api/v1/auth/verifyResetCode", { resetCode });
    return data;
  };

  const resetPassword = async (email: string, newPassword: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.put("/api/v1/auth/resetPassword", { email, newPassword });
    return data;
  };

  const updatePassword = async (values: object): Promise<AuthResponse> => {
    const { data } = await axiosInstance.put(
      "/api/v1/users/changeMyPassword",
      values,
      {
        headers: {
          token: userToken || (typeof window !== "undefined" ? localStorage.getItem("userToken") : ""),
        },
      }
    );
    if (data.token) {
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
    }
    return data;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userToken");
      setUserToken(null);
      window.location.href = "/login";
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        userToken, 
        setUserToken, 
        forgotPassword, 
        verifyResetCode, 
        resetPassword, 
        updatePassword, 
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("useUser must be used within a UserContextProvider");
  return context;
};