"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/core/axios.config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post("/api/v1/auth/forgotPasswords", values);
        if (data.statusMsg === "success") {
          toast.success(data.message);
          router.push("/verify-code"); 
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error occurred");
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Enter your email to receive a verification code
        </p>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="email" 
              placeholder="Email address"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors.email}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-bold shadow-sm active:scale-95"
          >
            {formik.isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}