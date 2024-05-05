"use client";

import AdaptiveDialog from "./adaptive-dialog";

import createTask from "@/actions/create";
import { User } from "next-auth";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ScaleLoader } from "react-spinners";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props extends Readonly<{ user: User }> {}

export default function CreateTask({ user }: Props) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const { pending } = useFormStatus();

  return (
    <AdaptiveDialog
      title="Create task"
      trigger="Create task"
      description="Enter task title and deadline date."
      setOpen={setOpen}
      open={open}
    >
      <form
        className="flex flex-col gap-2 px-4 md:px-0"
        action={async (formData: FormData) => {
          const content = formData.get("content") as string;
          await createTask({
            content,
            deadline: date,
            creator: { connect: { id: user.id } },
          });

          setOpen(false);
          setDate(undefined);
        }}
      >
        <DatePicker date={date} setDate={setDate} />
        <Input name="content" placeholder="Task title" />
        <Button disabled={pending}>
          {JSON.stringify(pending)}
          {pending ? <ScaleLoader /> : "Create"}
        </Button>
      </form>
    </AdaptiveDialog>
  );
}
