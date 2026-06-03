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
  //states
  const [taskList, setTaskList] = useState([]);
  const [resp, setResp] = useState({});
  const [toDelete, setToDelete] = useState([]);

  //varibales
  const entryList = taskList.filter((item) => item.type == "entry");
  const badList = taskList.filter((item) => item.type == "bad");
  const isEntryEmpty = entryList.length === 0;
  const isBadEmpty = badList.length === 0;
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
    if (ttlHours + taskObj.hr > hourPerWeek) {
      return alert("Number of hour per weeek exceeded");
    }

    const response = await postTask(taskObj);
    setResp(response);
    if (response.status === "success") {
      // refetch all the data
      getAllTask();
    }
  };

  const handleOndelete = async (idsToDelete) => {
    if (window.confirm("Are you sure yo want to delete this entry ?")) {
      //delete to do
      const response = await deleteTask(idsToDelete);
      setResp(response);

      if (response.status === "success") {
        getAllTask();
        //empty the todelete array
        setToDelete([]);
      }
    }
  };

  const switchTask = async (_id, type) => {
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

    // mount tat data to our tasklist
    data?.status === "success" && setTaskList(data.tasks);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    let tempArg = [];
    if (value === "allEntry") {
      tempArg = entryList;
    }

    if (value === "allBadList") {
      tempArg = badList;
    }

    if (checked) {
      if (value === "allEntry" || value === "allBadList") {
        //get all value from entry list
        const _ids = tempArg.map((item) => item._id);
        const uniqueIds = [...new Set([...toDelete, ..._ids])];
        setToDelete(uniqueIds);
        return;
      }

      setToDelete([...toDelete, value]);
    } else {
      if (value === "allEntry" || value === "allBadList") {
        const _ids = tempArg.map((item) => item._id);
        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }

      setToDelete(toDelete.filter((_id) => _id !== value));
    }
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
          handleOndelete={handleOndelete}
          switchTask={switchTask}
          toDelete={toDelete}
          entryList={entryList}
          badList={badList}
          isEntryEmpty={isEntryEmpty}
          isBadEmpty={isBadEmpty}
          handleOnSelect={handleOnSelect}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
