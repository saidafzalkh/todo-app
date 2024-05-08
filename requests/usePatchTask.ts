"use client";

import { useToast } from "@/components/ui/use-toast";
import ENDPOINTS from "@/configs/api";
import { Prisma, Task } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function usePatchTask(refetch?: boolean) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Prisma.TaskUpdateInput) => {
      const api = ENDPOINTS.PATCH.TASK(data.id as string);
      delete data.id;
      return await axios.patch<Task>(api, data);
    },

    onSuccess: () => {
      toast({
        description: "✨ Task is updated",
      });
      refetch && queryClient.refetchQueries({ queryKey: ["tasks"] });
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
