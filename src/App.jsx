import "./App.css";
import { useState } from "react";
import { Form } from "./Form";
import { Table } from "./Table";

import { Footer } from "./Footer";
import { postTask } from "./helpers/axiosHelper";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [resp, setResp] = useState({});

  const hourPerWeek = 168;
  const ttlHours = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const totalBadHours = taskList
    .filter((item) => item.type === "bad")
    .reduce((acc, item) => acc + item.hr, 0);

  const addTaskList = async (taskObj) => {
    // if (!taskObj.task || !taskObj.hr)
    //   return alert("Both input fields are required");

    // // if (ttlHours + taskObj.hr > hourPerWeek) {
    // //   return alert("Number of hour per weeek exceeded");
    // // }
    // setTaskList([...taskList, obj]);

    const response = await postTask(taskObj);
    setResp(response);
  };

  const randomId = () => {
    const str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let id = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);

      id += str[randomIndex];
    }

    return id;
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure yo want to delete this entry ?")) {
      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id === id) {
          return { ...item, type: type };
        }
        if (taskList.length == 0);
        return item;
      }),
    );
  };

  return (
    <>
      <div className="wrapper">
        <Form
          addTaskList={addTaskList}
          ttlHours={ttlHours}
          totalBadHours={totalBadHours}
        />
        {resp.message && (
          <div
            className={
              resp?.status === "success"
                ? "alert alert-success  mt-3 container"
                : "alert alert-danger  mt-3 container "
            }
          >
            {resp?.message}
          </div>
        )}

        <Table
          taskList={taskList}
          deleteItem={deleteItem}
          switchTask={switchTask}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
