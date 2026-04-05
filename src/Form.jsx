import React from "react";

export const Form = ({ handleOnSubmit }) => {
  return (
    <>
      <div className="container">
        <h1 className="text-center">Time tracker</h1>
        <form
          onSubmit={handleOnSubmit}
          className="border rounded-5 shadow-lg p-5 mt-5"
        >
          <div className="row g-3">
            <div className="col-md-7">
              <input
                type="text"
                className="form-control"
                placeholder="Task "
                aria-label="task"
                name="task"
                id="task"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="40"
                aria-label="hr"
                min="1"
                name="hr"
                id="hr"
              />
            </div>

            <div className="col-md-3 d-grid">
              <button className="btn btn-primary">Add New Task</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
