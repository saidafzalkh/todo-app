"use client";

import { useToast } from "@/components/ui/use-toast";
import ENDPOINTS from "@/configs/api";
import { Prisma, Task } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function usePostTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Prisma.TaskCreateInput) => {
      const api = ENDPOINTS.POST.TASK;
      return await axios.post<Task>(api, data);
    },

    onSuccess: () => {
      toast({
        description: "🎉 Task is created",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (err) => {
      console.log(err);
      toast({
        variant: "destructive",
        title: "🚨 Error",
        description: err.message,
      });
    },
  });
}
