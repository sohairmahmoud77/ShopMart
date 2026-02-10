"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/core/axios.config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      newPassword: Yup.string()
        .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with capital letter")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.put("/api/v1/auth/resetPassword", values);
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          toast.success("Password updated successfully!");
          router.push("/login");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Reset failed");
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Set New Password</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Confirm Email"
            className="w-full p-3 border rounded-md"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs">{formik.errors.email}</p>}

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-md"
            {...formik.getFieldProps("newPassword")}
          />
          {formik.touched.newPassword && formik.errors.newPassword && <p className="text-red-500 text-xs">{formik.errors.newPassword}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}