"use client";
import { useEffect, useState } from "react";

const LoadingSuspense = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "." : prevDots + "."));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-8 border-orange-700 border-r-8 border-b-transparent border-l-transparent">
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-400 opacity-40 animate-[spin_8s_linear_infinite]"></div>
        </div>
        <div className="absolute animate-bounce mt-12">
          <span className="text-4xl">🚀</span>
        </div>
      </div>
      <h2 className="mt-16 font-public text-2xl font-semibold text-orange-700 animate-pulse">
        Memuat<span className="inline-block animate-bounce">{dots}</span>
      </h2>
      <p className="text-orange-500 mt-2 italic text-sm">
        Sedang menyiapkan keajaiban...
      </p>
    </div>
  );
};

export default LoadingSuspense;
