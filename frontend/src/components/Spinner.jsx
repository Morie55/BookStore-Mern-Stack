import React from "react";

const Spinner = () => {
  return (
    <div className="mx-auto w-1/2 flex items-center justify-center h-full">
      <div className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></div>
    </div>
  );
};

export default Spinner;
