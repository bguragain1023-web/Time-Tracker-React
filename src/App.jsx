import "./App.css";
import { useEffect, useState } from "react";
import { Form } from "./Form";
import { Table } from "./Table";

import { Footer } from "./Footer";
import {
  postTask,
  fetchAllTasks,
  updateTask,
  deleteTask,
} from "./helpers/axiosHelper";

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

  useEffect(() => {
    getAllTask();
  }, []);

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

  const deleteItem = async (_id) => {
    if (window.confirm("Are you sure yo want to delete this entry ?")) {
      // setTaskList(taskList.filter((item) => item.id !== id));
      const response = await deleteTask({ _id });
      setResp(response);
      //refetch again
      getAllTask();
    }
  };

  const switchTask = async (_id, type) => {
    // setTaskList(
    //   taskList.map((item) => {
    //     if (item.id === id) {
    //       return { ...item, type: type };
    //     }
    //     if (taskList.length == 0);
    //     return item;
    //   }),
    // );
    const response = await updateTask({ _id, type });
    setResp(response);
    if (response.status === "success") {
      // refetch all the data
      getAllTask();
    }
  };

  const getAllTask = async () => {
    //call axios to get all data from sever
    const data = await fetchAllTasks();
    console.log(data);

    // mount tat data to our tasklist
    data?.status === "success" && setTaskList(data.tasks);
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
