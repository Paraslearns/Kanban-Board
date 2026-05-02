import { X } from "lucide-react";
import { columns, labelOptions } from "../data/seed";
import { useBoardStore } from "../store/useBoardStore";

export default function TaskEditor({ taskId, onClose }) {
  const projects = useBoardStore((state) => state.projects);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const updateTask = useBoardStore((state) => state.updateTask);
  const project = projects.find((item) => item.id === activeProjectId);
  const task = project?.tasks.find((item) => item.id === taskId);

  if (!task) return null;

  const toggleLabel = (labelId) => {
    const labels = task.labels.includes(labelId)
      ? task.labels.filter((item) => item !== labelId)
      : [...task.labels, labelId];
    updateTask(task.id, { labels });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4">
      <section className="w-full max-w-xl rounded-lg bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-950">Edit task</h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            title="Close editor"
            aria-label="Close editor"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-bold text-slate-700">Title</span>
            <input
              value={task.title}
              onChange={(event) => updateTask(task.id, { title: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-cyan-400 transition focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-bold text-slate-700">Description</span>
            <textarea
              value={task.description}
              onChange={(event) => updateTask(task.id, { description: event.target.value })}
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 outline-none ring-cyan-400 transition focus:ring-2"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Column</span>
              <select
                value={task.columnId}
                onChange={(event) => updateTask(task.id, { columnId: event.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-cyan-400 transition focus:ring-2"
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Due date</span>
              <input
                type="date"
                value={task.dueDate}
                onChange={(event) => updateTask(task.id, { dueDate: event.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-cyan-400 transition focus:ring-2"
              />
            </label>
          </div>

          <div>
            <span className="mb-2 block text-sm font-bold text-slate-700">Labels</span>
            <div className="flex flex-wrap gap-2">
              {labelOptions.map((label) => (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => toggleLabel(label.id)}
                  className={`rounded-lg border px-3 py-2 text-sm font-bold transition ${
                    task.labels.includes(label.id)
                      ? label.color
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
