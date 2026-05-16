import "./App.css";
import { useState } from "react";
import { Form } from "./Form";
import { Table } from "./Table";

import { Footer } from "./Footer";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [totalBadHrs, setTotalBadHour] = useState(null)
   
  const hourPerWeek = 168;

  const totalHours = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);

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
      <Form handleOnSubmit={handleOnSubmit} totalHours ={totalHours} totalBadHrs={totalBadHrs}/>
      <Table
        taskList={taskList}
        deleteItem={deleteItem}
        switchTask={switchTask}
        setTotalBadHour ={setTotalBadHour}
      />
     <Footer/>
    </>
  );
}

export default App;
