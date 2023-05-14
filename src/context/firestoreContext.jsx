/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { app } from "../firebase";
import { useAuth } from "./AuthContext";
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

  const addTodo = async (todo) => {
    try {
      const todoRef = collection(db, `users/${user.uid}/Todo`);
      await addDoc(todoRef, todo);
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
  };

  const deleteTodo = async (id) => {
    const todoRef = doc(db, `users/${user.uid}/Todo/${id}`);
    await deleteDoc(todoRef);
  };

  return (
    <firestoreContext.Provider
      value={{ addTodo, getTodos, updateTodo, deleteTodo }}
    >
      {children}
    </firestoreContext.Provider>
  );
}
