import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* العنوان الرئيسي الكبير */}
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
        Welcome to ShopMart
      </h1>

      {/* الوصف الصغير */}
      <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        Discover the latest technology, fashion, and lifestyle products. 
        Quality guaranteed with fast shipping and excellent customer service.
      </p>

      {/* الأزرار (Buttons) */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/products" 
          className="bg-black text-white px-10 py-4 rounded-md font-bold hover:bg-gray-800 transition-all shadow-lg"
        >
          Shop Now
        </Link>
        
        <Link 
          href="/categories" 
          className="bg-white text-black border-2 border-black px-10 py-4 rounded-md font-bold hover:bg-gray-50 transition-all"
        >
          Browse Categories
        </Link>
      </div>

      {/* خط فاصل بسيط تحت الـ Hero Section */}
      <div className="w-full max-w-6xl border-b border-gray-100 mt-24"></div>
    </div>
  );
}