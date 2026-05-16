import React from "react";

export const Form = ({ handleOnSubmit, totalHours, totalBadHrs}) => {

  return (
    <>
     <div className="header d-flex justify-content-between align-items-center">
        <div className="project-name">
          Time tracker
        </div>
        <div className="hours-display d-flex justify-content-between align-items-center gap-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Allocated</span>
            <strong className="alloc-hours">{totalHours || 0} hr </strong>
          </div>
       <div className="divider"></div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Could save</span>
            <strong className="bad-hours ">{totalBadHrs || 0} hrs</strong>
          </div>
        </div>
      </div>
     
      <div className="container">

     
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
