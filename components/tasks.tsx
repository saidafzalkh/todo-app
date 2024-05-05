import getTasks from "@/actions/get";
import NothingTodo from "./illustrations/nothing-todo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <div className="p-4 border mb-4">
      <div aria-label="filter" className="w-full flex justify-end">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" defaultValue={"latest"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => <li key={task.id}>{task.content}</li>)
        ) : (
          <li className="flex flex-col gap-2 items-center justify-center py-2">
            <NothingTodo className="max-w-[300px] h-auto fill-foreground" />
          </li>
        )}
      </ul>
    </div>
  );
}
