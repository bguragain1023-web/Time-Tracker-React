import "./App.css";
import { useState } from "react";
import { Form } from "./Form";
import { Table } from "./Table";
import { TotalHour } from "./TotalHour";

function App() {
  const [taskList, setTaskList] = useState([]);
  const hourPerWeek = 168;

  const totalHours = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);

  const randomId = (length = 6) => {
    const str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let id = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);

      id += str[randomIndex];
    }
    return id;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);

    const task = newForm.get("task");
    const hour = +newForm.get("hr");

    const entryData = {
      task: task,
      hour: hour,
      type: "entry",
      id: randomId(),
    };
    if (task == "" || hour == "") {
      return alert("Both of the input fields are required");
    }

    if (totalHours + hour > hourPerWeek) {
      return alert("Number of hour per weeek exceeded");
    }

    setTaskList([...taskList, entryData]);

    console.log(taskList);
  };
  const deleteItem = (id) => {
    if (window.confirm("Are you sure yo want to delete this entry ?")) {
      const filteredList = taskList.filter((item) => item.id !== id);
      setTaskList(filteredList);
    }
  };

  const switchTask = (id, type) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, type: type };
      }
      return item;
    });
    setTaskList(updatedList);
  };

  return (
    <>
      <Form handleOnSubmit={handleOnSubmit} />
      <Table
        taskList={taskList}
        deleteItem={deleteItem}
        switchTask={switchTask}
      />
      <TotalHour ttlHours={totalHours} />
    </>
  );
}

export default App;
