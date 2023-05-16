/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./AudioRecorder.css"

export function AudioRecorder({ addTodo, fetchTodos }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  // const [transcription, setTranscription] = useState("");
  const [recorder, setRecorder] = useState(null);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    if (recorder) {
      const chunks = [];
      recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });
      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(chunks, { type: "audio/mp4", bitsPerSecond: 128000 });
        setAudioURL(URL.createObjectURL(audioBlob));
        transcribeAudio(audioBlob);
      });
    }
  }, [recorder]);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setRecorder(recorder);
        setIsRecording(true);
        recorder.start();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStopRecording = () => {
    if (recorder && recorder.state === "recording") {
      setIsRecording(false);
      recorder.stop();
    }
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.mp4");
    formData.append("model", "whisper-1");
    console.log(formData.get("file")); // Esto imprimirá el Blob
    console.log(formData.get("file").type); // Esto imprimirá el tipo MIME del Blob, que en este caso será 'audio/webm'

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log();
    // setTranscription(data.text);

    const response2 = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
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
                "A partir de la tarea 'quiero agregar una tarea de [tarea a agregar]',conviertelo en una accion simple recuerda que es un Todo,solo respondeme con el json, no respondas con otra cosa mas que el json,necesito que seas específico con la tarea a realizar, modificalo a algo que sea conciso no solo transcribas el texto del usuario sino entiendelo y resumelo para que sea un Todo,genera un objeto JSON en formato de string con el siguiente formato: '{\"title\":\"[tarea a agregar sin comillas]\"}'",
            },
            {
              role: "user",
              content: `agrega una tarea de ${data.text}`,
            },
          ],
        }),
      }
    );

    const data2 = await response2.json();
    console.log(data2.choices[0].message.content);
    const newTodoTitle =
      JSON.parse(data2.choices[0].message.content).title || "Error in OpenAI";

    // Agregar el nuevo todo a la lista de tareas
    addTodo({
      title: newTodoTitle,
      isCompleted: false,
    });

    // Limpiar el formulario
    fetchTodos();
  };

  return (
    <div className="audio-recorder-container">
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default AudioRecorder;
