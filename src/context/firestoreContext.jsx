/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect} from "react";
import { app } from "../firebase";
import { useAuth } from "./authContext";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const firestoreContext = createContext();

export const useFirestore = () => {
  const context = useContext(firestoreContext);
  return context;
};

export function FirestoreProvider({ children }) {
  const { user } = useAuth();
  const db = getFirestore(app);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, [user]);

  const addTodo = async (todo) => {
    try {
      const todoRef = collection(db, `users/${user.uid}/Todo`);
      await addDoc(todoRef, todo);
      setTodos((prevTodos) => [...prevTodos, todo]);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodos = async () => {
    const todoRef = collection(db, `users/${user.uid}/Todo`);
    const snapshot = await getDocs(todoRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const updateTodo = async (id, newValue) => {
    const todoRef = doc(db, `users/${user.uid}/Todo/${id}`);
    await updateDoc(todoRef, newValue);
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? {...todo, ...newValue} : todo));
  };

  const deleteTodo = async (id) => {
    const todoRef = doc(db, `users/${user.uid}/Todo/${id}`);
    await deleteDoc(todoRef);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <firestoreContext.Provider
      value={{todos, addTodo, getTodos, updateTodo, deleteTodo }}
    >
      {children}
    </firestoreContext.Provider>
  );
}
