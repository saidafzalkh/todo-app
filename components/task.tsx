"use client";

import usePatchTask from "@/requests/usePatchTask";
import type { Task as TaskType } from "@prisma/client";
import { PuffLoader } from "react-spinners";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Props extends Readonly<{ task: TaskType }> {}

export default function Task({ task }: Props) {
  const { isPending, mutate, isError } = usePatchTask();
  const [checked, setChecked] = useState<boolean>(task.is_completed);
  const today = new Date();
  useEffect(() => {
    if (isError) setChecked(task.is_completed);
  }, [isError, task]);

  return (
    <li className="bloc hover:bg-muted">
      <label className="flex justify-between items-center py-2 px-1 border-b cursor-pointer">
        <div className="flex items-center gap-2">
          {isPending ? (
            <PuffLoader color="#00B0FF" size={14} />
          ) : (
            <Checkbox
              onCheckedChange={(value: boolean) => {
                mutate({
                  id: task.id,
                  is_completed: value,
                });

                setChecked(value);
              }}
              checked={checked}
            />
          )}
          <span className={cn(checked && "line-through text-muted-foreground")}>
            {task.content}
          </span>
        </div>
        <div className="text-end ">
          {task.deadline ? (
            <span
              className={cn(
                new Date(task.deadline) < today && !checked && "text-red-300",
                format(task.deadline, "PP") == format(today, "PP") &&
                  "text-yellow-600",
                checked && "text-muted-foreground"
              )}
            >
              {format(task.deadline, "PP")}
            </span>
          ) : (
            <span className="pr-1">-</span>
          )}
        </div>
      </label>
    </li>
  );
}
