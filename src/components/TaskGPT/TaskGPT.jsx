/* eslint-disable react/prop-types */
import { useState } from "react";
import "./TaskGPT";

function TodoForm({ addTodo, fetchTodos }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const [todoText, setTodoText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Enviar la solicitud a la API de OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0,
        messages: [
          {
            role: "assistant",
            content:
              "A partir de la tarea 'quiero agregar una tarea de [tarea a agregar]',conviertelo en una accion simple recuerda que es un Todo,solo respondeme con el json, no respondas con otra cosa mas que el json, modificalo a algo que sea conciso no solo transcribas el texto del usuario sino entiendelo y resumelo para que sea un Todo,genera un objeto JSON en formato de string con el siguiente formato: '{\"title\":\"[tarea a agregar sin comillas]\"}'",
          },
          {
            role: "user",
            content: `agrega una tarea de ${todoText}`,
          },
        ],
      }),
    });
    // Obtener la respuesta de la API
    const data = await response.json();
    console.log(data.choices[0].message.content);
    const newTodoTitle =
      JSON.parse(data.choices[0].message.content).title || "Error in OpenAI";

    // Agregar el nuevo todo a la lista de tareas
    addTodo({
      title: newTodoTitle,
      isCompleted: false,
    });

    // Limpiar el formulario
    setTodoText("");
    fetchTodos();
  };

  const handleTodoTextChange = (event) => {
    setTodoText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={todoText} onChange={handleTodoTextChange} />
      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TodoForm;
