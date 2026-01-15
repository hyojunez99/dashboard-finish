import { useState } from "react";

const TodoForm = ({ onSave,children  }) => {
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); //이미 있는 기능 실행 방지
    onSave(task);
    setTask("");
  };
  
  return (
    <div id="todo-form">
      <div className="todo-box">
        <p>할 일</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            placeholder="할 일을 추가하세요"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        </form>
        {children}
      </div>
    </div>
  );
};

export default TodoForm;
