"use client";

import { useUserStore } from "@/src/store/useUserStore";
import { User, Building2 } from "lucide-react";

export default function RoleToggle() {
  const { isFounder, toggleRole } = useUserStore();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 rounded-full p-1.5 flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 pl-2">View as:</span>
        <button
          onClick={toggleRole}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            isFounder
              ? "bg-primary text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Founder
        </button>
        <button
          onClick={toggleRole}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            !isFounder
              ? "bg-slate-800 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Regular User
        </button>
      </div>
    </div>
  );
}
