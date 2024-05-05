import getTasks from "@/actions/get";
import NothingTodo from "./illustrations/nothing-todo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default async function Tasks() {
  const tasks = await getTasks('latest');
  const today = format(new Date(), "PP");

  return (
    <div className="p-4 border mb-4">
      <div aria-label="filter" className="w-full flex justify-end">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" defaultValue={"latest"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Created date</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[290px] rounded-md border p-4 mt-4">
        <ul>
          {tasks.length > 0 ? (
            <>
              <li className="w-full flex justify-between items-center py-2 border-b">
                <span>Title</span>
                <span>Deadline</span>
              </li>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="w-full flex justify-between items-center py-2 border-b"
                >
                  <label className="flex gap-2 items-center">
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
                  <span
                    className={cn(
                      format(task.deadline!, "PP") === today &&
                        !task.is_completed &&
                        "text-red-300",
                      task.is_completed && "text-muted-foreground"
                    )}
                  >
                    {format(task.deadline!, "PP")}
                  </span>
                </li>
              ))}
            </>
          ) : (
            <li className="flex flex-col gap-2 items-center justify-center h-full">
              <NothingTodo className="max-w-[250px] h-auto fill-foreground" />
            </li>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
