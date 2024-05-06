"use client";

import { useToast } from "@/components/ui/use-toast";
import ENDPOINTS from "@/configs/api";
import { Prisma, Task } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function usePatchTask() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Prisma.TaskUpdateInput) => {
      const api = ENDPOINTS.PATCH.TASK(data.id as string);
      delete data.id;
      return await axios.patch<Task>(api, data);
    },

    onSuccess: () => {
      toast({
        description: "✨ Task updated",
      });
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
