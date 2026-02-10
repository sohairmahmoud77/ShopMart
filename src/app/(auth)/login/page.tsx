"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ApiError {
  message: string;
}

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        
        if (data.message === "success") {
          localStorage.setItem("userToken", data.token);
          
          router.push("/");
        }
      } catch (err) {
        const error = err as AxiosError<ApiError>;
        alert(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back!</h1>
      <p className="text-gray-500 mb-6">Please enter your details to sign in.</p>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer font-bold hover:underline"
            onClick={() => router.push("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}