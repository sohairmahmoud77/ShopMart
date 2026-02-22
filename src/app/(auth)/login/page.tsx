"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/core/axios.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Loader2, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useUser();
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.post("/api/v1/auth/signin", values);
        if (data.message === "success") {
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          toast.success("Welcome Back!");
          router.push("/");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Login Failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-4 py-10">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-500 font-medium">Login to your account to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all font-medium"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-[11px] mt-2 ml-2 font-bold uppercase tracking-wider italic">
                ! {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all font-medium"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            
            {/* التعديل هنا: الروابط المساعدة بشكل احترافي */}
            <div className="flex justify-between items-center mt-3 px-1">
              <Link 
                href="/forgot-password" 
                className="text-[13px] font-bold text-gray-400 hover:text-black transition-colors"
              >
                Forgot Password?
              </Link>
              
              <Link 
                href="/profile/change-password" 
                className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-all border border-blue-100"
              >
                <ShieldCheck size={14} />
                Change Password
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-gray-100"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Login <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-10 text-gray-500 font-medium">
          If you don't have account, please{" "}
          <Link 
            href="/register" 
            className="text-black font-black underline underline-offset-4 hover:text-blue-600 transition-colors"
          >
            SignUp Now
          </Link>
        </p>
      </div>
    </div>
  );
}