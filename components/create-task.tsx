"use client";

import AdaptiveDialog from "./adaptive-dialog";

import createTask from "@/actions/create";
import { useState } from "react";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CreateTask() {
  const [date, setDate] = useState<Date>();
  return (
    <AdaptiveDialog
      title="Create task"
      trigger="Create task"
      description="Enter task title and deadline date."
    >
      <form
        action={async (formData: FormData) => {
          const content = formData.get("content") as string;

          await createTask({ creator: { connect: { id: "" } }, content });
        }}
        className="flex flex-col gap-2 px-4 md:px-0"
      >
        <DatePicker date={date} setDate={setDate} />
        <Input name="content" placeholder="Task title" />
        <Button>Create</Button>
      </form>
    </AdaptiveDialog>
  );
}
