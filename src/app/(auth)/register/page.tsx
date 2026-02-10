"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// 
interface ApiError {
  message: string;
}

export default function Register() {
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(20).required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with Capital letter and be 6-11 chars")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message === "success") {
          router.push("/login");
        }
      } catch (err) {
        // 
        const error = err as AxiosError<ApiError>;
        alert(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

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

        <div>
          <input
            name="rePassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>
          )}
        </div>

        <div>
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400"
        >
          {formik.isSubmitting ? "Processing..." : "Register Now"}
        </button>
      </form>
    </div>
  );
}