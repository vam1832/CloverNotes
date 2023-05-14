/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useFirestore } from "../../context/firestoreContext";
import styles from "./Task.module.scss";

function Task({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const { updateTodo, deleteTodo } = useFirestore();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(newTitle.length, newTitle.length);
    }
  }, [isEditing, newTitle]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
  };

  const handleSave = async () => {
    if (newTitle !== "") {
      await updateTodo(todo.id, { title: newTitle });
      fetchTodos();
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    fetchTodos();
  };

  const handleCheckboxChange = async () => {
    await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
    fetchTodos();
  };

  return (
    <div className={styles["todo-item"]}>
      {isEditing ? (
        <div className={styles["todo-edit"]}>
          <div className={styles["todo-edit-data"]}>
            <textarea
              ref={textareaRef}
              className={styles["todo-editing-title"]}
              onChange={(e) => setNewTitle(e.target.value)}
            >
              {newTitle}
            </textarea>
            <div className={styles["todo-action-buttons"]}>
              <button onClick={handleSave}>💾</button>
              <button onClick={handleCancel}>x</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["todo"]}>
          <div className={styles["todo-data"]}>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              name={`todo-${todo.id}`}
              checked={todo.isCompleted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`todo-${todo.id}`}>
              <p className={styles["todo-title"]}>{todo.title}</p>
            </label>
          </div>
          <div className={styles["todo-action-buttons"]}>
            <button onClick={handleEdit}>✏️</button>
            <button onClick={handleDelete}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
