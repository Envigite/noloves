"use client";

import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";

export function AdminTopbar() {
  const { user } = useUserStore();
  const pathname = usePathname();

  const breadcrumbs = pathname
    .split("/")
    .filter((p) => p !== "" && p !== "admin")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <div className="w-full flex justify-between items-center px-6 h-full py-4 bg-slate-800/95 backdrop-blur">
      <div className="hidden md:flex items-center text-sm text-slate-400">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb} className="flex items-center">
            <span
              className={
                index === breadcrumbs.length - 1 ? "text-white font-medium" : ""
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-white leading-none">
            {user?.username}
          </p>
          <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider mt-1">
            {user?.role}
          </p>
        </div>

        <div className="h-9 w-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-white font-bold shadow-sm">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </div>
  );
}
