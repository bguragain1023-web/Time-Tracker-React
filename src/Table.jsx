import React from "react";
export const Table = ({ taskList, deleteItem, switchTask }) => {
  const entryList = taskList.filter((item) => item.type == "entry");

  const badList = taskList.filter((item) => item.type == "bad");
  const isEntryEmpty = entryList.length === 0;
  const isBadEmpty = badList.length === 0;

  return (
    <>
      <div className="row mt-5 border m-2 table-edit">
        <div className="col-md">
          {/* <!-- entry list  --> */}
          <div className="table-box border ">
            <div className="box-nav d-flex justify-content-between ">
              <div className="box-title text-success">Entry list</div>
              <div className="entry-count text-success">
                {" "}
                Task: <strong>{entryList.length}</strong>{" "}
              </div>
            </div>
            <hr />

            {isEntryEmpty ? (
              <div className="empty-entry"> No task list added</div>
            ) : (
              <table className="table table-striped table-hover border">
                <tbody>
                  {entryList.map((item, i) => (
                    <tr key={item?._id}>
                      <td>{i + 1}</td>
                      <td>{item.task}</td>
                      <td>{item.hr}</td>
                      <td className="text-end">
                        <button
                          onClick={() => deleteItem(item._id)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button
                          onClick={() => switchTask(item._id, "bad")}
                          className="btn btn-success"
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* <!-- Bad list  --> */}
        </div>
        <div className="col-md">
          <div className="table-box border">
            <div className="box-nav d-flex justify-content-between">
              <div className="box-title text-danger">Bad list</div>
              <div className="entry-count text-danger">
                {" "}
                Task: <strong>{badList.length}</strong>{" "}
              </div>
            </div>
            <hr />

            {isBadEmpty ? (
              <div className="empty-entry "> No Bad entry added</div>
            ) : (
              <table className="table table-striped table-hover border">
                <tbody>
                  {badList.map((item, i) => (
                    <tr key={item?._id}>
                      <td>{i + 1}</td>
                      <td>{item.task}</td>
                      <td>{item.hr}</td>
                      <td className="text-end">
                        <button
                          onClick={() => switchTask(item._id, "entry")}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
