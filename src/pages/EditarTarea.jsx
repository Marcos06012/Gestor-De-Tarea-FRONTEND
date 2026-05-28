import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../pages/api/AxiosConfig";



export default function EditarTarea() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibimos la tarea desde la pantalla anterior
  const tarea = location.state?.tarea || {

    // si no obtiene una tarea le da estos valores
    title: "",
    fechaInicio: "",
    fechaVencimiento: "",
  };

  console.log(location.state?.tarea);


  const [title, setTitle] = useState(tarea.title);
  const [fechaInicio, setFechaInicio] = useState(tarea.created_at);
  const [fechaVencimiento, setFechaVencimiento] = useState(tarea.finished_at);
  const [description, setDescriptionNueva] = useState(tarea.description);

  const guardarCambios = (e) => {
    e.preventDefault();
    GuardarNuevaEdicion();
    alert("Cambios guardados:\n" + title + "\n" + fechaInicio + " → " + fechaVencimiento);
    navigate("/tareas");
  };

  const GuardarNuevaEdicion = async () => {
    try {
      const updated = { title: title, description: description, fechaInicio: fechaInicio, fechaVencimiento: fechaVencimiento };
      await api.put(`/tasks/${tarea.id}`, updated);

    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-400 p-8">
      <div className="dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center dark:text-white mb-6">
          Editar Tarea
        </h1>

        <form onSubmit={guardarCambios} className="flex flex-col gap-4">
          <div>
            <label className="font-medium dark:text-white">Tarea</label>
            <input
              type="text"
              value={title}
              placeholder="Ingresa la tarea"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full dark:text-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="font-medium dark:text-white">Decripcion</label>
            <input
              type="text"
              value={description}
              placeholder="Ingresa la nueva descripcion"
              onChange={(e) => setDescriptionNueva(e.target.value)}
              className="w-full dark:text-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

          </div>




          <div>
            <label className="font-medium dark:text-white">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full dark:text-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-medium dark:text-white">Fecha Vencimiento</label>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="w-full dark:text-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/tareas")}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
