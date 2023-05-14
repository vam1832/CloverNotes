import { useState, useEffect } from "react";
import { useFirestore } from "../../context/firestoreContext";
import Task from "../Task/Task";
// import TodoForm from "../TaskGPT/TaskGPT";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import styles from "./tasklist.module.scss";

function TaskList() {
  const { getTodos, addTodo, isLoading } = useFirestore();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = async () => {
    await addTodo({
      title: newTodo,
      isCompleted: false,
    });
    setNewTodo("");
    fetchTodos();
  };

  const fetchTodos = async () => {
    const todosData = await getTodos();
    setTodos(todosData);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
    };
    fetchTodos();
  }, [getTodos, addTodo]);

  if (isLoading) return <h2>cargando...</h2>;

  return (
    <div className={styles["todo-list-container"]}>
      <h1 className={styles["title-todo-list"]}>Todo List</h1>
      {/* <VoiceRecognition addTodo={addTodo} fetchTodos={fetchTodos} /> */}
      {/* <TodoForm addTodo={addTodo} fetchTodos={fetchTodos} /> */}
      <div className={styles["add-todo-container"]}>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="New todo..."
          className={styles["input-add-todo"]}
        />
        <button onClick={handleNewTodoSubmit}>+</button>
      </div>
      <AudioRecorder addTodo={addTodo} fetchTodos={fetchTodos} />
      {todos.length > 0 ? (
        <div className={styles["todos-container"]}>
          {todos.map((todo) => (
            <Task key={todo.id} todo={todo} fetchTodos={fetchTodos} />
          ))}
        </div>
      ) : (
        <p>No todos found</p>
      )}
    </div>
  );
}

export default TaskList;
