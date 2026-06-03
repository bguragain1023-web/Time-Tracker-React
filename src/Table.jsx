export const Table = ({
  entryList,
  handleOndelete,
  switchTask,
  isBadEmpty,
  isEntryEmpty,
  handleOnSelect,
  badList,
  toDelete,
}) => {
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
            <input
              className="form-check-input"
              type="checkbox"
              value="allEntry"
              id="all-entry"
              onChange={handleOnSelect}
              checked={
                entryList.length > 0 &&
                entryList.every((item) => toDelete.includes(item._id))
              }
            />
            {"  "}
            <label htmlFor="all-entry">Select All</label>
            <hr />

            {isEntryEmpty ? (
              <div className="empty-entry"> No task list added</div>
            ) : (
              <table className="table table-striped table-hover border">
                <tbody>
                  {entryList.map((item, i) => (
                    <tr key={item?._id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item?._id}
                          onChange={handleOnSelect}
                          checked={toDelete.includes(item?._id)}
                        />
                        {i + 1}
                      </td>
                      <td>{item.task}</td>
                      <td>{item.hr}</td>
                      <td className="text-end">
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
            <input
              className="form-check-input"
              type="checkbox"
              value="allBadList"
              id="all-bad"
              onChange={handleOnSelect}
              checked={
                badList.length > 0 &&
                badList.every((item) => toDelete.includes(item._id))
              }
            />
            {"  "}
            <label htmlFor="all-bad">Select All</label>
            <hr />
            {isBadEmpty ? (
              <div className="empty-entry "> No Bad entry added</div>
            ) : (
              <table className="table table-striped table-hover border">
                <tbody>
                  {badList.map((item, i) => (
                    <tr key={item?._id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item?._id}
                          onChange={handleOnSelect}
                          checked={toDelete.includes(item?._id)}
                        />
                        {i + 1}
                      </td>
                      <td>{item.task}</td>
                      <td>{item.hr}</td>
                      <td className="text-end">
                        <button
                          onClick={() => switchTask(item._id, "entry")}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
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

      {toDelete.length > 0 && (
        <div className=" container p-3 d-grid mt-4 my-3">
          <button
            className="btn btn-danger"
            onClick={() => handleOndelete(toDelete)}
          >
            Delete {toDelete.length} Tasks{" "}
          </button>
        </div>
      )}
    </>
  );
};
