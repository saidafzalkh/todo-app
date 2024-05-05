"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import useGetTasks from "@/requests/useGetTasks";
import { Task } from "@prisma/client";
import { format } from "date-fns";
import NothingTodo from "./illustrations/nothing-todo";
import Loading from "./loading";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterT } from "@/types/filter.type";
import { useState } from "react";

export default function Tasks() {
  const [filter, setFilter] = useState<FilterT>("latest");
  const { data, isLoading, refetch } = useGetTasks(filter);
  const tasks: Task[] = data?.data;

  const today = new Date();

  return (
    <div className="p-4 border mb-4">
      <div aria-label="filter" className="w-full flex justify-end">
        <Select
          defaultValue="latest"
          onValueChange={(value: FilterT) => {
            setFilter(value);
            refetch();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="latest">Created date</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[290px] rounded-md border mt-4 p-2">
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {tasks.length > 0 ? (
              <>
                <li className="w-full flex justify-between items-center py-2 px-1 border-b">
                  <span>Title</span>
                  <span>Deadline</span>
                </li>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="w-full flex justify-between items-center py-2 px-1 border-b hover:bg-accent"
                  >
                    <label className="flex gap-2 items-center cursor-pointer">
                      <Checkbox />
                      <span
                        className={cn(
                          task.is_completed &&
                            "line-through text-muted-foreground"
                        )}
                      >
                        {task.content}
                      </span>
                    </label>
                    <div className="text-end ">
                      {task.deadline ? (
                        <span
                          className={cn(
                            new Date(task.deadline) < today &&
                              !task.is_completed &&
                              "text-red-300",
                            format(task.deadline, "PP") ==
                              format(today, "PP") && "text-yellow-600",
                            task.is_completed && "text-muted-foreground"
                          )}
                        >
                          {format(task.deadline, "PP")}
                        </span>
                      ) : (
                        <span className="pr-1">-</span>
                      )}
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <li className="flex flex-col gap-2 items-center justify-center h-full">
                <NothingTodo className="max-w-[250px] h-auto fill-foreground" />
              </li>
            )}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
