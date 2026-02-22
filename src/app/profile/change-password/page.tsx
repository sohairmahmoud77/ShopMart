"use client";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import { Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const { updatePassword, logout } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    rePassword: "", // يفضل إضافة هذا الحقل لأن معظم الـ APIs تطلبه للتأكيد
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ التعديل الجوهري: نرسل كائن واحد (Object) بدلاً من قيم منفصلة
      await updatePassword({
        currentPassword: formData.currentPassword,
        password: formData.password,
        rePassword: formData.password // في حال كان الـ API يتطلب rePassword نرسله هنا
      });

      toast.success("Password updated successfully! Please login again 🚀");
      
      // ننتظر قليلاً ثم نقوم بتسجيل الخروج لإجبار المستخدم على تجديد التوكن
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error: any) {
      console.error("Change Password Error:", error);
      const errorMsg = error.response?.data?.errors?.msg || error.response?.data?.message || "Incorrect current password";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
        <div className="text-center mb-8">
          <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Security</h1>
          <p className="text-gray-400 mt-2 font-bold text-[10px] tracking-widest uppercase">Update your account credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Current Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-gray-300"
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">New Password</label>
            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-gray-300"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-[42px] text-gray-400 hover:text-black transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-gray-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Credentials"}
          </button>
        </form>
      </div>
    </div>
  );
}