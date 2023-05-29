/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, memo } from "react";
import { useFirestore } from "../../context/firestoreContext";
import styles from "./Task.module.scss";

function Task({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
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
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const handleCheckboxChange = async () => {
    const previousIsCompleted = isCompleted;
    setIsCompleted(!isCompleted); // Actualizar el estado local primero
    updateTodo(todo.id, { isCompleted: !isCompleted }) // Actualizar Firestore en el fondo
      .then(() => {
        // Recuperar todos solo después de que Firestore se haya actualizado
        setIsCompleted(!isCompleted);
      })
      .catch((error) => {
        // Si la actualización falla, revertir el cambio en la interfaz de usuario y mostrar un mensaje de error
        setIsCompleted(previousIsCompleted);
        console.error("Error updating todo:", error);
        alert("An error occurred while updating the todo. Please try again.");
      });
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
              defaultValue={newTitle}
            >

            </textarea>
            <div className={styles["todo-action-buttons"]}>
              <button className={styles['task-btn']} onClick={handleSave}>💾</button>
              <button className={styles['task-btn']} onClick={handleCancel}>x</button>
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
            <button className={styles['task-btn']} onClick={handleEdit}>✏️</button>
            <button className={styles['task-btn']} onClick={handleDelete}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Task);
