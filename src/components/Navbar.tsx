import React from "react";

export function Navbar() {
  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-7xl">
      <div className="flex items-center justify-between rounded-2xl bg-white/90 p-3 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">NB</div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Notice Board</div>
            <div className="text-xs text-slate-500">Internal communications</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#notice-form"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            New Notice
          </a>

          <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 md:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2a7 7 0 00-7 7v3.5l-1.7 1.7A1 1 0 004 16h16a1 1 0 00.7-1.7L19 12.5V9a7 7 0 00-7-7z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
