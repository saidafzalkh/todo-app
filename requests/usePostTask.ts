import { useToast } from "@/components/ui/use-toast";
import ENDPOINTS from "@/configs/api";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function usePostTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Prisma.TaskCreateInput) => {
      const api = ENDPOINTS.POST.TASK;
      return await axios.post(api, data);
    },

    onSuccess: () => {
      toast({
        description: "Task created!",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (err) => {
      console.log(err);
      toast({ variant: "destructive", description: "Something went wrong!" });
    },
  });
}
