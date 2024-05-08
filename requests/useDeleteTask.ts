"use client";

import { useToast } from "@/components/ui/use-toast";
import ENDPOINTS from "@/configs/api";
import { Task } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const api = ENDPOINTS.DELETE.TASK(id);
      return await axios.delete<Task>(api);
    },

    onSuccess: () => {
      toast({
        description: "💥 Task is deleted",
      });
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    },

    onError: (err) => {
      console.log(err);
      toast({
        variant: "destructive",
        title: "🚨 Error",
        description: err.message,
      });
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    },
  });
}
