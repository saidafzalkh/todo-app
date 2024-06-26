const ENDPOINTS = {
  GET: {
    TASKS: "/api/task/get-all",
  },
  POST: {
    TASK: "api/task/create",
  },
  PATCH: {
    TASK: (id: string) => `api/task/update/${id}`,
  },
  DELETE: {
    TASK: (id: string) => `api/task/delete/${id}`,
  }
} as const;

export default ENDPOINTS;
