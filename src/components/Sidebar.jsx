import { Plus, FolderKanban } from "lucide-react";
import { useState } from "react";
import { useBoardStore } from "../store/useBoardStore";

export default function Sidebar() {
  const [name, setName] = useState("");
  const projects = useBoardStore((state) => state.projects);
  const activeProjectId = useBoardStore((state) => state.activeProjectId);
  const setActiveProject = useBoardStore((state) => state.setActiveProject);
  const addProject = useBoardStore((state) => state.addProject);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addProject(trimmed);
    setName("");
  };

  return (
    <aside className="rounded-lg border border-white/80 bg-white/75 p-4 shadow-soft backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        <FolderKanban size={20} className="text-cyan-700" />
        <h2 className="text-base font-bold text-slate-950">Projects</h2>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
              project.id === activeProjectId
                ? "bg-cyan-700 text-white shadow-sm"
                : "bg-white/70 text-slate-700 hover:bg-white"
            }`}
          >
            <span className="block truncate">{project.name}</span>
            <span className="text-xs opacity-70">{project.tasks.length} tasks</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none ring-cyan-400 transition focus:ring-2"
          placeholder="New project"
        />
        <button
          className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-600 text-white transition hover:bg-cyan-700"
          title="Add project"
          aria-label="Add project"
        >
          <Plus size={18} />
        </button>
      </form>
    </aside>
  );
}
