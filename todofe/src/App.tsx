import { useState } from "react";
import "./App.css";
import { enqueueSnackbar } from "notistack";

type Task = {
  id: number;
  name: string;
  importance: string;
  status: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Lập trình React",
      importance: "Bắt buộc",
      status: "Chưa hoàn thành",
    },
    {
      id: 2,
      name: "Lập trình Node",
      importance: "Bắt buộc",
      status: "Chưa hoàn thành",
    },
    {
      id: 3,
      name: "Lập trình Vue",
      importance: "Bắt buộc",
      status: "Đã hoàn thành",
    },
  ]);

  const [newTask, setNewTask] = useState<string>("");
  const [taskImportance, setTaskImportance] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddTask = () => {
    if (!newTask || !taskImportance) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
      return;
    }

    const task = {
      id: tasks.length + 1,
      name: newTask,
      importance: taskImportance === "must" ? "Bắt buộc" : "Không bắt buộc",
      status: "Chưa hoàn thành",
    };

    setTasks([...tasks, task]);
    enqueueSnackbar("Tạo thành công", { variant: "success" });
    setNewTask("");
    setTaskImportance("");
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Chưa hoàn thành"
                  ? "Đã hoàn thành"
                  : "Chưa hoàn thành",
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    enqueueSnackbar("Xóa thành công", { variant: "success" });
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="app-container">
        <h1 className="title">This is my Todo List</h1>
        <div className="action-form">
          <input
            type="text"
            className="task-input"
            placeholder="Nhập công việc cần làm"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            className="select-input"
            value={taskImportance}
            onChange={(e) => setTaskImportance(e.target.value)}
          >
            <option value="" disabled>
              Lựa chọn độ quan trọng
            </option>
            <option value="must">Bắt buộc</option>
            <option value="optional">Không bắt buộc</option>
          </select>
        </div>
        <div className="submit">
          <input
            type="text"
            className="filter-task"
            placeholder="Tìm theo từ khóa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="submit-btn" onClick={handleAddTask}>
            Tạo
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead className="header-table">
              <tr>
                <th>Công việc</th>
                <th>Độ quan trọng</th>
                <th>Tình trạng</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="body-table">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className={task.status === "Đã hoàn thành" ? "completed" : ""}
                >
                  <td>{task.name}</td>
                  <td>{task.importance}</td>
                  <td
                    className={`status-change ${
                      task.status === "Đã hoàn thành"
                        ? "complete"
                        : "incomplete"
                    }`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status}
                  </td>

                  <td className="delete-column">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
