"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserContextType {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("userToken");
      if (savedToken) {
        // الـ setTimeout دي هي السر اللي هيشيل الخط الأحمر
        setTimeout(() => {
          setUserToken(savedToken);
        }, 0);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};