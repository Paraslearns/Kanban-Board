import { Calendar, Pencil, Trash2 } from "lucide-react";
import { labelOptions } from "../data/seed";
import { useBoardStore } from "../store/useBoardStore";

const labelById = Object.fromEntries(labelOptions.map((label) => [label.id, label]));

export default function TaskCard({ task, onEdit }) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const due = task.dueDate ? new Date(`${task.dueDate}T00:00:00`) : null;
  const overdue = due && due < new Date(new Date().toDateString()) && task.columnId !== "done";

  return (
    <article
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/task-id", task.id)}
      className="cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="min-w-0 break-words text-sm font-bold text-slate-950">{task.title}</h4>
        <div className="flex shrink-0 gap-1">
          <button
            onClick={onEdit}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">{task.description}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {task.labels.map((labelId) => {
          const label = labelById[labelId];
          if (!label) return null;
          return (
            <span
              key={label.id}
              className={`rounded-md border px-2 py-1 text-xs font-bold ${label.color}`}
            >
              {label.name}
            </span>
          );
        })}
      </div>

      {task.dueDate && (
        <div
          className={`mt-3 flex items-center gap-1.5 text-xs font-semibold ${
            overdue ? "text-rose-700" : "text-slate-500"
          }`}
        >
          <Calendar size={14} />
          {due.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </div>
      )}
    </article>
  );
}
