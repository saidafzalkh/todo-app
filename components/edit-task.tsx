"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import usePatchTask from "@/requests/usePatchTask";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { z } from "zod";
import AdaptiveDialog from "./adaptive-dialog";

const formSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Task title is required" })
    .max(50)
    .refine((value) => value.trim().length > 0, {
      message: "Task title cannot be only whitespace.",
    }),
  deadline: z.date().optional(),
});

interface Props extends Readonly<{ task: Required<Task> }> {}

export default function EditTask({ task }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const mutation = usePatchTask(true);
  const { isPending, isSuccess } = mutation;

  function onSubmit({ content, deadline }: z.infer<typeof formSchema>) {
    mutation.mutate({
      id: task.id,
      content,
      deadline,
    });
  }

  useEffect(() => {
    setOpen(false);
    form.reset({
      content: task.content as string,
      deadline: task.deadline ? new Date(task.deadline) : undefined,
    });
  }, [form, isSuccess, task]);

  return (
    <AdaptiveDialog
      title="Edit task"
      trigger={
        <Button variant={"outline"} size={"icon"}>
          <Pencil size={16} />
        </Button>
      }
      description="Edit your task title and deadline (optional)"
      setOpen={setOpen}
      open={open}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task title</FormLabel>
                <FormControl>
                  <Input placeholder="Cook a dinner" {...field} />
                </FormControl>
                <FormDescription>
                  Describe what you want to do in few words
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline for task</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a deadline</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = task.deadline
                          ? new Date(task.deadline)
                          : new Date();
                        !task.deadline && today.setDate(today.getDate() - 1);

                        return date < today;
                      }}
                      initialFocus
                      weekStartsOn={1}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>It is not required.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <ScaleLoader color="#00B0FF" height={16} /> : "Update"}
          </Button>
        </form>
      </Form>
    </AdaptiveDialog>
  );
}
