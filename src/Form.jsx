import React from "react";

export const Form = () => {
  return (
    <>
      <form
        action="javascript:void(0)"
        onsubmit="handleOnSubmit(this)"
        class="border rounded-5 shadow-lg p-5 mt-5"
      >
        <div class="row g-3">
          <div class="col-md-7">
            <input
              type="text"
              class="form-control"
              placeholder="Task "
              aria-label="task"
              name="task"
              id="task"
            />
          </div>
          <div class="col-md-2">
            <input
              type="number"
              class="form-control"
              placeholder="40"
              aria-label="hr"
              min="1"
              name="hr"
              id="hr"
            />
          </div>

          <div class="col-md-3 d-grid">
            <button class="btn btn-primary">Add New Task</button>
          </div>
        </div>
      </form>
    </>
  );
};
