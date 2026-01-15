const TodoList = ({ todos, onDel, onToggle }) => {
  const listStyle = {
    maxHeight: "calc(3*3.5rem)",
    overflowY: "auto",
    paddingRight: todos.length > 3 ? "0.5rem" : "0",
  };
  return (
    <ul id="todo-list" style={listStyle}>
      {todos.map((list, idx) => {
        return (
          <li key={idx}>
            <input
              type="checkbox"
              onChange={() => {
                onToggle(list.id);
              }}
              checked={list.done}
            />
            <span
              style={{
                textDecoration: list.done ? "line-through" : "none",
                textDecorationColor: list.done ? "#222" : "none",
                textDecorationThickness: list.done ? "3px" : "none",
              }}
            >
              {list.todo}
            </span>
            <button
              onClick={() => {
                onDel(list.id);
              }}
            >
              ✕
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
