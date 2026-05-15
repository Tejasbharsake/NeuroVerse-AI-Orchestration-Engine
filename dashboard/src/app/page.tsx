"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Cpu, 
  Activity, 
  ArrowUpRight, 
  Workflow, 
  Database, 
  BrainCircuit,
  Terminal
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { useMutation } from "@tanstack/react-query";
import { workflowApi } from "@/lib/api";
import { useTelemetry } from "@/hooks/useTelemetry";
import { cn } from "@/lib/utils";

const data = [
  { time: "00:00", active: 24, load: 45 },
  { time: "04:00", active: 18, load: 32 },
  { time: "08:00", active: 45, load: 68 },
  { time: "12:00", active: 62, load: 85 },
  { time: "16:00", active: 55, load: 72 },
  { time: "20:00", active: 42, load: 58 },
  { time: "23:59", active: 38, load: 50 },
];

export default function Dashboard() {
  const telemetry = useTelemetry();

  const stats = [
    { label: "Active Agents", value: telemetry?.active_agents.toString() || "842", delta: "+12%", icon: Target, color: "text-sky-500" },
    { label: "Tasks Executed", value: telemetry?.tasks_executed.toLocaleString() || "1.2M", delta: "+24%", icon: Zap, color: "text-amber-500" },
    { label: "Neural Load", value: `${telemetry?.neural_load || 68}%`, delta: "-5%", icon: Cpu, color: "text-emerald-500" },
    { label: "Avg Latency", value: `${telemetry?.latency || 42}ms`, delta: "-8ms", icon: Activity, color: "text-rose-500" },
  ];

  const executeMutation = useMutation({
    mutationFn: (goal: string) => workflowApi.executeGoal(goal),
    onSuccess: (res) => {
      alert(`Workflow Started! ID: ${res.data.workflow_id}`);
    },
    onError: () => {
      alert("Failed to connect to Neural Backend. Ensure FastAPI is running on port 8000.");
    }
  });

  const handleDeploy = () => {
    executeMutation.mutate("Analyze system performance and optimize neural load.");
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="relative group">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-sky-500 to-emerald-500 rounded-full hidden md:block"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-4"
          >
            NEURAL COMMAND
            <span className="text-xs font-mono px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded animate-pulse font-bold">
              SYSTEM_LIVE
            </span>
          </motion.h1>
          <div className="flex items-center gap-4">
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ai-pulse" />
              STATUS: <span className="text-emerald-600 font-bold">OPTIMIZED_BY_AI</span>
            </p>
            <div className="h-px w-20 bg-slate-200" />
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em]">
              REF_ID: <span className="text-sky-600 font-bold">NV-99-SKY</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDeploy}
            disabled={executeMutation.isPending}
            className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            {executeMutation.isPending ? "ORCHESTRATING..." : "DEPLOY AGENT"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-mono font-bold ${stat.delta.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.delta}
              </span>
            </div>
            <div className="text-3xl font-black text-white mb-1 relative z-10">{stat.value}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest relative z-10">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Execution Velocity</h3>
              <p className="text-xs text-slate-500">Real-time task orchestration throughput</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="50%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(14, 165, 233, 0.1)" />
                <XAxis dataKey="time" stroke="rgba(15, 23, 42, 0.4)" fontSize={10} />
                <YAxis stroke="rgba(15, 23, 42, 0.4)" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="active" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorActive)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-tight">Neural Distribution</h3>
          <div className="space-y-6">
            {[
              { label: "Planning Core", val: 82, color: "bg-sky-500" },
              { label: "Memory Retrieval", val: 45, color: "bg-amber-500" },
              { label: "Agent Execution", val: 94, color: "bg-emerald-500" },
              { label: "Security Scanning", val: 30, color: "bg-rose-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[10px] mb-2 uppercase tracking-widest font-bold">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-white font-mono">{item.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(14,165,233,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
           className="glass-card rounded-2xl p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
              <Terminal size={20} className="text-sky-500" />
              Live Kernel Logs
            </h3>
          </div>
          <div className="space-y-4 font-mono text-[11px]">
            {[
              { t: "00:34:12", m: "CORE_SYSTEM: Initializing neural connection...", s: "info" },
              { t: "00:34:10", m: "PLANNER: Goal decomposition success.", s: "success" },
              { t: "00:34:08", m: "SECURITY: Level 4 clear.", s: "success" },
              { t: "00:34:05", m: "AGENT_X: Requesting memory access.", s: "info" },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 p-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <span className="text-slate-600">{log.t}</span>
                <span className={cn(
                  log.s === "success" && "text-emerald-500",
                  log.s === "info" && "text-sky-400",
                  log.s === "danger" && "text-rose-500"
                )}>
                  {log.m}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Planning Engine", desc: "Complex Goal Decomp", icon: BrainCircuit, color: "text-purple-500" },
            { title: "Memory Engine", desc: "Vector Retrieval", icon: Database, color: "text-amber-500" },
            { title: "Workflow Builder", desc: "Visual Editor", icon: Workflow, color: "text-sky-500" },
            { title: "Tool Router", desc: "API Integrations", icon: ArrowUpRight, color: "text-emerald-500" },
          ].map((card) => (
            <div key={card.title} className="glass-card p-6 rounded-2xl hover:border-sky-500/50 transition-all cursor-pointer group">
              <card.icon size={32} className={cn("mb-4 transition-transform group-hover:scale-110", card.color)} />
              <h4 className="font-bold text-white mb-1 tracking-tight">{card.title}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
