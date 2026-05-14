"use client";

import { useState, useEffect } from "react";

export interface TelemetryData {
  neural_load: number;
  active_agents: number;
  latency: number;
  tasks_executed: number;
}

export function useTelemetry() {
  const [data, setData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/telemetry");

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setData(payload);
    };

    socket.onclose = () => {
      console.log("Telemetry WebSocket closed. Retrying...");
    };

    return () => {
      socket.close();
    };
  }, []);

  return data;
}
