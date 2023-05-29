import { useState, useEffect } from "react";
import { useFirestore } from "../../context/firestoreContext";
import Task from "../Task/Task";
// import TodoForm from "../TaskGPT/TaskGPT";
import Calendar from "../CalendarTask/CalendarTask";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import styles from "./Tasklist.module.scss";

function TaskList() {
  const { getTodos, addTodo, isLoading, todos } = useFirestore();
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
  };

  useEffect(() => {
    getTodos();
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
        <button className={styles['add-btn']} onClick={handleNewTodoSubmit}>+</button>
      </div>
      <AudioRecorder addTodo={addTodo} getTodos={getTodos} />
      <Calendar/>
      {todos.length > 0 ? (
        <div className={styles["todos-container"]}>
          {todos.map((todo) => (
            <Task key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p>No todos found</p>
      )}
    </div>
  );
}

export default TaskList;
