import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";

const Todos = () => {
  /**
   * id : 현재시간 Date.now() :
   * done : true / false
   * todo : text
   */
  const [todos, setTodos] = useState(() => {
    // localStorage에 있는 TODOS를 읽어오기
    const loaded = localStorage.getItem("TODOS");
    // 값이 있으면 변환해서 쓰고, 없으면 빈배열을 기본값으로 쓰고
    return loaded ? JSON.parse(loaded) : [];
  });
  useEffect(() => {
    // todos를 localstorage에 저장
    const saved = JSON.stringify(todos);
    localStorage.setItem("TODOS", saved);
  }, [todos]);
  const handleTodosSave = (list) => {
    // 배열에 저장
    // setTodos((prev) => {
    //     return [...prev, list];
    const newTodo = { id: Date.now(), done: false, todo: list };
    setTodos((prev) => {
      return [...prev, newTodo];
    });
  };
  const handleTodosDel = (id) => {
    // idx 번호에 해당되는 list 제거
    const update = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(update);
  };
  const handleToggle = (id) => {
    const update = todos.map((list) => {
      return list.id === id ? { ...list, done: !list.done } : list;
    });
    setTodos(update);
  };
  return (
    <div className="todo-page">
      <TodoForm onSave={handleTodosSave}>
        <TodoList
          todos={todos}
          onDel={handleTodosDel}
          onToggle={handleToggle}
        />
      </TodoForm>
    </div>
  );
};

export default Todos;
