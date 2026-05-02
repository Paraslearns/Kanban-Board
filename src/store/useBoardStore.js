import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedProjects } from "../data/seed";

const uid = () => crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random()}`;

export const useBoardStore = create(
  persist(
    (set, get) => ({
      projects: seedProjects,
      activeProjectId: seedProjects[0].id,
      search: "",
      labelFilter: "all",

      setActiveProject: (projectId) => set({ activeProjectId: projectId }),
      setSearch: (search) => set({ search }),
      setLabelFilter: (labelFilter) => set({ labelFilter }),

      addProject: (name) =>
        set((state) => {
          const project = { id: uid(), name, tasks: [] };
          return {
            projects: [...state.projects, project],
            activeProjectId: project.id
          };
        }),

      addTask: (columnId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === state.activeProjectId
              ? {
                  ...project,
                  tasks: [
                    {
                      id: uid(),
                      title: "New task",
                      description: "",
                      columnId,
                      labels: [],
                      dueDate: ""
                    },
                    ...project.tasks
                  ]
                }
              : project
          )
        })),

      updateTask: (taskId, patch) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === state.activeProjectId
              ? {
                  ...project,
                  tasks: project.tasks.map((task) =>
                    task.id === taskId ? { ...task, ...patch } : task
                  )
                }
              : project
          )
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === state.activeProjectId
              ? {
                  ...project,
                  tasks: project.tasks.filter((task) => task.id !== taskId)
                }
              : project
          )
        })),

      moveTask: (taskId, columnId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === state.activeProjectId
              ? {
                  ...project,
                  tasks: project.tasks.map((task) =>
                    task.id === taskId ? { ...task, columnId } : task
                  )
                }
              : project
          )
        })),

      activeProject: () =>
        get().projects.find((project) => project.id === get().activeProjectId)
    }),
    {
      name: "capstone-kanban-board",
      partialize: (state) => ({
        projects: state.projects,
        activeProjectId: state.activeProjectId
      })
    }
  )
);
