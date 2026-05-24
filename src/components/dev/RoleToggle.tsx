"use client";

import { useUserStore } from "@/src/store/useUserStore";
import { User, Building2 } from "lucide-react";

export default function RoleToggle() {
  const { isFounder, toggleRole } = useUserStore();


  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-slate-200 dark:border-white/5 rounded-full p-1.5 flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2">View as:</span>
        <button
          onClick={toggleRole}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            isFounder
              ? "bg-primary text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Founder
        </button>
        <button
          onClick={toggleRole}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            !isFounder
              ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Regular User
        </button>
      </div>
    </div>
  );
}
