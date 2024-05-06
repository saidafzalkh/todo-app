"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import usePatchTask from "@/requests/usePatchTask";
import type { Task as TaskType } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface Props extends Readonly<{ task: TaskType }> {}

export default function Task({ task }: Props) {
  const { isPending, mutate: update, isError } = usePatchTask();
  const [checked, setChecked] = useState<boolean>(task.is_completed);
  const today = new Date();
  useEffect(() => {
    if (isError) setChecked(task.is_completed);
  }, [isError, task]);

  return (
    <li className="flex border-b">
      <label className="flex hover:bg-muted w-full justify-between items-center py-2 px-1 cursor-pointer">
        <div className="flex items-center gap-2">
          {isPending ? (
            <PuffLoader color="#00B0FF" size={14} />
          ) : (
            <Checkbox
              onCheckedChange={(value: boolean) => {
                update({
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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"icon"} variant={'ghost'} className="!rounded-none">
            <EllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
