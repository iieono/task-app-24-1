import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  // useState
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newData, setNewData] = useState("");

  // useEffect
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    calcStatus();
  }, [tasks]);

  // functions
  // add new task
  const newTask = () => {
    const data = {
      completed: false,
      id: tasks.length + 1,
      title: newData,
      userId: 2,
    };
    setTasks((tasks) => [data, ...tasks]);
    setNewData("");
  };

  // count completed status
  const calcStatus = () => {
    setCount(0);
    tasks.forEach((task) => {
      if (task.completed) {
        setCount((state) => (state += 1));
      }
    });
  };
  // toggle individual status
  const toggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  // template
  const getData = async () => {
    try {
      const config = {
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container" id="main-container">
      <div className="center-container">
        <div className="header-container">
          <p className="text-white md:text-fuchsia-950 text-3xl font-bold tracking-wide">
            ToDO List
          </p>
          <p className="text-gray-300">{tasks.length} tasks</p>
          <div className="flex gap-2 items-center py-1">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-gray-200 text-xl flex items-center"
            />
            <p className="text-white md:text-fuchsia-950">
              Completed {Math.round((count / tasks.length) * 100)}% of the task.
            </p>
          </div>
          <div className="h-1.5 bg-gray-300 rounded-full mt-1">
            <div
              className="h-full bg-blue-600 w-20 rounded-full"
              id="progress"
              style={{ width: `${(count / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="p-1 rounded-xl flex">
          <input
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            type="text"
            className="border border-fuchsia-950 rounded-l-xl px-4 py-2 w-full focus:outline-none"
            placeholder="New Task..."
          />
          <button
            className="rounded-r-xl w-20  bg-fuchsia-950 text-gray-200 bg-opacity-50 text-3xl"
            onClick={newTask}
          >
            +
          </button>
        </div>
        <div className="p-1 flex flex-col rounded-xl bg-inherit overflow-y-auto gap-2">
          {tasks &&
            tasks.map((task) => (
              <div
                className="task-container"
                onClick={() => toggleStatus(task?.id)}
              >
                <div className="w-5">
                  {task?.completed ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-gray-400 text-xl flex items-center"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="border-2 border-fuchsia-800 text-transparent rounded-full text-md flex items-center"
                    />
                  )}
                </div>
                {task?.completed ? (
                  <p className="line-through text-gray-400">{task?.title}</p>
                ) : (
                  <p className="text-fuchsia-950">{task?.title}</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
