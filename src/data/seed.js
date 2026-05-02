export const columns = [
  { id: "todo", title: "To Do", tone: "border-cyan-300" },
  { id: "progress", title: "In Progress", tone: "border-amber-300" },
  { id: "review", title: "Review", tone: "border-violet-300" },
  { id: "done", title: "Done", tone: "border-emerald-300" }
];

export const labelOptions = [
  { id: "ui", name: "UI", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  { id: "logic", name: "Logic", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "docs", name: "Docs", color: "bg-violet-100 text-violet-800 border-violet-200" },
  { id: "bug", name: "Bug", color: "bg-rose-100 text-rose-800 border-rose-200" }
];

export const seedProjects = [
  {
    id: "capstone",
    name: "Sem 2 Capstone",
    tasks: [
      {
        id: "task-1",
        title: "Create board layout",
        description: "Build responsive columns and reusable card components.",
        columnId: "todo",
        labels: ["ui"],
        dueDate: "2026-05-06"
      },
      {
        id: "task-2",
        title: "Wire drag and drop",
        description: "Move cards between columns with browser drag events.",
        columnId: "progress",
        labels: ["logic"],
        dueDate: "2026-05-09"
      },
      {
        id: "task-3",
        title: "Add localStorage persistence",
        description: "Keep projects and tasks after page refresh.",
        columnId: "review",
        labels: ["logic", "docs"],
        dueDate: "2026-05-12"
      },
      {
        id: "task-4",
        title: "Polish submission notes",
        description: "Make the app easy to explain during demo.",
        columnId: "done",
        labels: ["docs"],
        dueDate: "2026-05-01"
      }
    ]
  },
  {
    id: "portfolio",
    name: "Portfolio Launch",
    tasks: [
      {
        id: "task-5",
        title: "Collect project screenshots",
        description: "Choose clean visuals for the portfolio cards.",
        columnId: "todo",
        labels: ["ui", "docs"],
        dueDate: "2026-05-15"
      }
    ]
  }
];
