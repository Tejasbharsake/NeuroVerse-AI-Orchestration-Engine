"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Workflow, 
  Database, 
  Brain, 
  Share2, 
  Wrench, 
  PlayCircle, 
  ShieldCheck, 
  Activity, 
  BarChart3, 
  Server, 
  FileText, 
  Cpu, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Command
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "AI Agents", href: "/agents" },
  { icon: Workflow, label: "Workflows", href: "/workflows" },
  { icon: Database, label: "Memory Engine", href: "/memory" },
  { icon: Brain, label: "Planning Engine", href: "/planning" },
  { icon: Share2, label: "Event Router", href: "/events" },
  { icon: Wrench, label: "Tool Integrations", href: "/tools" },
  { icon: PlayCircle, label: "Runtime Execution", href: "/runtime" },
  { icon: ShieldCheck, label: "Security Center", href: "/security" },
  { icon: Activity, label: "Monitoring", href: "/monitoring" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Server, label: "Infrastructure", href: "/infrastructure" },
  { icon: FileText, label: "Logs", href: "/logs" },
  { icon: Cpu, label: "DevOps", href: "/devops" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="relative h-screen bg-white border-r border-sky-500/10 flex flex-col z-50 shadow-[10px_0_40px_rgba(14,165,233,0.06)]"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-4 border-b border-slate-50">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)]">
          <Command className="text-white" size={24} />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="font-bold text-slate-900 tracking-wider">NEUROVERSE</span>
            <span className="text-[10px] text-emerald-500 font-mono font-bold">AI ORCHESTRATOR</span>
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={cn(
              "group relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 mb-1",
              activeItem === item.label 
                ? "bg-sky-50 text-sky-600 border border-sky-100 shadow-sm" 
                : "text-slate-500 hover:bg-slate-50 hover:text-sky-500"
            )}
          >
            <item.icon size={22} className={cn(
              "transition-transform group-hover:scale-110",
              activeItem === item.label && "text-sky-500"
            )} />
            
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-semibold"
              >
                {item.label}
              </motion.span>
            )}

            {activeItem === item.label && (
              <motion.div
                layoutId="active-indicator"
                className="absolute left-0 w-1 h-6 bg-sky-500 rounded-r-full"
              />
            )}
          </div>
        ))}
      </nav>

      {/* System Status Section */}
      {!collapsed && (
        <div className="p-4 m-4 rounded-2xl bg-sky-50/50 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">System Status</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
          </div>
          <div className="text-xs text-slate-700 font-bold uppercase tracking-tight">Neural Core: <span className="text-emerald-600">Active</span></div>
          <div className="mt-3 w-full bg-slate-200 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "84%" }}
              className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
            />
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 shadow-sm transition-all z-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
