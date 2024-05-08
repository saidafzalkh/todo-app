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
import useDeleteTask from "@/requests/useDeleteTask";
import usePatchTask from "@/requests/usePatchTask";
import type { Task as TaskType } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import EditTask from "./edit-task";

interface Props extends Readonly<{ task: TaskType }> {}

export default function Task({ task }: Props) {
  const { isPending, mutate: update, isError } = usePatchTask();
  const { mutate: deleteTask } = useDeleteTask();
  const [checked, setChecked] = useState<boolean>(task.is_completed);
  const [deleted, setDeleted] = useState<boolean>(false);
  const today = new Date();
  useEffect(() => {
    if (isError) setChecked(task.is_completed);
  }, [isError, task]);

  if (deleted) return <></>;

  return (
    <li className="flex items-center border-b py-1">
      <label className="flex hover:bg-muted w-full justify-between items-center py-2 px-1 cursor-pointer">
        <div className="w-[200px] sm:w-auto flex items-center gap-2">
          {isPending ? (
            <PuffLoader color="#00B0FF" size={16} />
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
        <div className="text-end">
          {task.deadline ? (
            <span
              className={cn(
                new Date(task.deadline) < today && !checked && "text-red-500",
                format(task.deadline, "PP") == format(today, "PP") &&
                  "text-amber-400",
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

      <div className="flex gap-2">
        <EditTask task={task} />
        <Button 
          variant={'destructive'}
          size={'icon'}
          onClick={() => {
            deleteTask(task.id);
            setDeleted(true);
          }}
        >
          <Trash size={16} />
        </Button>
      </div>

      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"icon"} variant={"ghost"} className="!rounded-none">
            <EllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </li>
  );
}
