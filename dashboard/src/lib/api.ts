import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const workflowApi = {
  executeGoal: (goal: string) => api.post("/workflows/execute", { goal }),
  getWorkflow: (id: string) => api.get(`/workflows/${id}`),
};

export const agentApi = {
  listAgents: () => api.get("/agents"),
  registerAgent: (data: any) => api.post("/agents/register", data),
};

export default api;
