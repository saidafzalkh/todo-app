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
import usePostTask from "@/requests/usePostTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AdaptiveDialog from "./adaptive-dialog";
import { ScaleLoader } from "react-spinners";

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

interface Props extends Readonly<{ user: User }> {}

export default function CreateTask({ user }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const mutation = usePostTask();
  const { isPending, isSuccess } = mutation;

  function onSubmit({ content, deadline }: z.infer<typeof formSchema>) {
    mutation.mutate({
      creator: { connect: { id: user.id } },
      content,
      deadline,
    });
  }

  useEffect(() => {
    setOpen(false);
    form.reset({
      content: "",
      deadline: undefined,
    });
  }, [form, isSuccess]);

  return (
    <AdaptiveDialog
      title="Create task"
      trigger={<Button className="w-full" variant={'secondary'}>Create task</Button>}
      description="Enter task title and deadline (optional)"
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
                        const today = new Date();
                        today.setDate(today.getDate() - 1);

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
            {isPending ? <ScaleLoader color="#00B0FF" height={16} /> : "Create"}
          </Button>
        </form>
      </Form>
    </AdaptiveDialog>
  );
}
