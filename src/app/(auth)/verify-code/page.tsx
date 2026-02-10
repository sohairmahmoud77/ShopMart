"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/core/axios.config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Code is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post("/api/v1/auth/verifyResetCode", values);
        if (data.status === "Success") {
          toast.success("Code verified! Now reset your password.");
          router.push("/reset-password"); 
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Invalid Code");
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Code</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Please enter the code sent to your email.
        </p>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-widest"
              {...formik.getFieldProps("resetCode")}
            />
            {formik.touched.resetCode && formik.errors.resetCode ? (
              <p className="text-red-500 text-xs mt-1 text-center">{formik.errors.resetCode}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {formik.isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
}