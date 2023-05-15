import TaskList from "../components/TaskList/TaskList";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FirestoreProvider } from "../context/firestoreContext";
import "./HomePage.css"

export default function HomePage() {
  const { user, logOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  if (isLoading) return <h2>cargando...</h2>;

  return (
    <div className="home-container">
      <FirestoreProvider>
        <TaskList />
      </FirestoreProvider>
      <p>Bienvenido {user.email}</p>
      <button onClick={handleLogOut}>Cerrar Sesión</button>
    </div>
  );
}
