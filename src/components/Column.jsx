import { Plus } from "lucide-react";
import { useBoardStore } from "../store/useBoardStore";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onEditTask }) {
  const addTask = useBoardStore((state) => state.addTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/task-id");
    if (taskId) moveTask(taskId, column.id);
  };

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={`flex min-h-[34rem] w-[18rem] shrink-0 flex-col rounded-lg border-t-4 ${column.tone} bg-white/80 p-3 shadow-soft backdrop-blur`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-950">{column.title}</h3>
          <p className="text-xs font-medium text-slate-500">{tasks.length} cards</p>
        </div>
        <button
          onClick={() => addTask(column.id)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-700 text-white transition hover:bg-cyan-800"
          title={`Add task to ${column.title}`}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="kanban-scroll flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={() => onEditTask(task.id)} />
        ))}
      </div>
    </div>
  );
}
