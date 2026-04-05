import React from "react";
export const Table = ({ taskList, deleteItem, switchTask }) => {
  const entryList = taskList.filter((item) => item.type == "entry");

  const badList = taskList.filter((item) => item.type == "bad");
  const totalBadHrs = badList.reduce((acc, item) => acc + item.hour, 0);
  return (
    <>
      <div className="row mt-5">
        <div className="col-md">
          <h3 className="text-center">Entry list</h3>
          <hr />

          {/* <!-- entry list  --> */}
          <table className="table table-striped table-hover border">
            <tbody>
              {entryList.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hour}</td>
                  <td className="text-end">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item.id, "bad")}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md">
          <h3 className="text-center">Bad list</h3>
          <hr />

          {/* <!-- Bad list  --> */}
          <table className="table table-striped table-hover border">
            <tbody>
              {badList.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hour}</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item.id, "entry")}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="alert alert-success">
            You could have save = {totalBadHrs}hours
          </div>
        </div>
      </div>
    </>
  );
};
