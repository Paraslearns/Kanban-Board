import { Search } from "lucide-react";
import { labelOptions } from "../data/seed";
import { useBoardStore } from "../store/useBoardStore";

export default function Header() {
  const search = useBoardStore((state) => state.search);
  const labelFilter = useBoardStore((state) => state.labelFilter);
  const setSearch = useBoardStore((state) => state.setSearch);
  const setLabelFilter = useBoardStore((state) => state.setLabelFilter);

  return (
    <header className="flex flex-col gap-4 border-b border-white/70 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
          Kanban Board
        </h1>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <label className="relative min-w-0 sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-lg border border-white bg-white/90 pl-10 pr-3 text-sm shadow-sm outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="Search tasks"
          />
        </label>
        <select
          value={labelFilter}
          onChange={(event) => setLabelFilter(event.target.value)}
          className="h-11 rounded-lg border border-white bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-sm outline-none ring-cyan-400 transition focus:ring-2"
        >
          <option value="all">All labels</option>
          {labelOptions.map((label) => (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
