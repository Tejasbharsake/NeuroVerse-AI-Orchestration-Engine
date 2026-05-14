"use client";

import React from "react";
import { Search, Bell, User, LayoutGrid, Globe, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="h-20 border-b border-sky-500/10 bg-[#020617]/70 backdrop-blur-md flex items-center justify-between px-8 z-40 sticky top-0">
      {/* Search Bar */}
      <div className="relative w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Command Search..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-slate-600"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* System Stats (Navbar Mini) */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-sky-500" />
            <span className="text-[10px] font-mono text-slate-300">OPS: GLOBAL</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-amber-500" />
            <span className="text-[10px] font-mono text-slate-300">SEC: LEVEL 4</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <LayoutGrid size={20} />
          </motion.button>
          <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
             className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-[#020617]" />
          </motion.button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-white">Commander Tejas</span>
            <span className="text-[10px] text-sky-500 font-mono tracking-tighter">PREMIUM_ACCESS</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
