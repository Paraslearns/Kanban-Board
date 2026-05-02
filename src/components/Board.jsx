import { columns } from "../data/seed";
import { useBoardStore } from "../store/useBoardStore";
import Column from "./Column";

export default function Board({ onEditTask }) {
  const projects = useBoardStore((state) => state.projects);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const search = useBoardStore((state) => state.search);
  const labelFilter = useBoardStore((state) => state.labelFilter);
  const project = projects.find((item) => item.id === activeProjectId);

  const normalizedSearch = search.trim().toLowerCase();
  const visibleTasks = (project?.tasks ?? []).filter((task) => {
    const matchesSearch =
      !normalizedSearch ||
      task.title.toLowerCase().includes(normalizedSearch) ||
      task.description.toLowerCase().includes(normalizedSearch);
    const matchesLabel = labelFilter === "all" || task.labels.includes(labelFilter);
    return matchesSearch && matchesLabel;
  });

  return (
    <section className="min-w-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{project?.name}</h2>
          <p className="text-sm text-slate-600">
            Drag cards, edit details, filter work, and switch projects.
          </p>
        </div>
        <div className="rounded-lg bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
          {visibleTasks.length} visible / {project?.tasks.length ?? 0} total
        </div>
      </div>

      <div className="kanban-scroll flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={visibleTasks.filter((task) => task.columnId === column.id)}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </section>
  );
}
