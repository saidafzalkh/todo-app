"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetTasks from "@/requests/useGetTasks";
import { FilterT } from "@/types/filter.type";
import type { Task as TaskType } from "@prisma/client";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import NothingTodo from "./illustrations/nothing-todo";
import Loading from "./loading";
import Task from "./task";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function Tasks() {
  const [filter, setFilter] = useState<FilterT>("latest");
  const { data, isLoading, refetch } = useGetTasks(filter);
  const tasks: TaskType[] = data?.data;

  return (
    <>
      <div aria-label="filter" className="w-full flex justify-end gap-2">
        <Button
          onClick={() => {
            refetch();
          }}
          type="button"
          size={"icon"}
          variant={"outline"}
        >
          <RotateCcw size={16} />
        </Button>
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
              <SelectItem value="uncompleted">Uncompleted</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[400px] rounded-md border p-2 pr-3">
        {isLoading ? (
          <Loading />
        ) : tasks.length > 0 ? (
          <ul>
            <li className="w-full flex justify-between items-center py-2 px-1 border-b">
              <span>Title</span>
              <div className="flex gap-8">
                <span>Deadline</span>
                <span>Actions</span>
              </div>
            </li>
            {tasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center h-full">
            <NothingTodo className="max-w-[250px] h-auto fill-foreground" />
          </div>
        )}
      </ScrollArea>
    </>
  );
}
