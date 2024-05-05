const ENDPOINTS = {
  GET: {
    TASKS: "/api/task/get-all",
  },
  POST: {
    TASK: "api/task/create",
  },
} as const;

export default ENDPOINTS;
