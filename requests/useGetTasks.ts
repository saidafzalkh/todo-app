"use client";

import ENDPOINTS from "@/configs/api";
import { FilterT } from "@/types/filter.type";
import type { Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetTasks(filter: FilterT) {
  return useQuery({
    queryKey: ["tasks", filter],
    queryFn: async () => {
      const api = ENDPOINTS.GET.TASKS;
      return await axios.get(api, { params: { filter } });
    },

    enabled: !!filter,
    refetchOnWindowFocus: false,
  });
}
