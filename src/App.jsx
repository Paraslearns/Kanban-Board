import Header from "./components/Header";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import TaskEditor from "./components/TaskEditor";
import { useState } from "react";

export default function App() {
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Header />
        <div className="grid flex-1 gap-5 py-5 lg:grid-cols-[17rem_1fr]">
          <Sidebar />
          <Board onEditTask={setEditingTaskId} />
        </div>
      </div>
      <TaskEditor taskId={editingTaskId} onClose={() => setEditingTaskId(null)} />
    </main>
  );
}
