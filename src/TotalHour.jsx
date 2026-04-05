import React from "react";

export const TotalHour = ({ ttlHours }) => {
  const totalHour = ttlHours;
  return (
    <div className="alert alert-success ">
      Total hours allocated : {totalHour} hours
    </div>
  );
};
