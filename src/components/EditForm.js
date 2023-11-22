import React, { useState } from "react";

const EditForm = ({ editTask, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length > 0) {
      editTask(value, task.id);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input
        className="todo-input"
        type="text"
        placeholder="Update task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Update task
      </button>
    </form>
  );
};

export default EditForm;
