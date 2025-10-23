import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../pages/api/AxiosConfig";

export default function ListaDeTareas() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tareas, setTareas] = useState([]);
  const [tareaNueva, setTareaNueva] = useState("");
  const [description, setDescriptionNueva] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const nombreUsuario = localStorage.getItem("userName");

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  }

  //GET TASKS para cargar tareas al inicio
  const obtenerTareas = async () => {
    try {
      const response = await api.get("/tasks");
      setTareas(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  // POST TASKS para crear nueva tarea
  const crearTareas = async (e) => {

    e.preventDefault();

    try {
      await api.post("/tasks", {
        title: tareaNueva,
        description: description,
        fechaInicio: fechaInicio,
        fechaVencimiento: fechaVencimiento

      });


      // Agregar nueva tarea a la lista local
      obtenerTareas();
      setTareaNueva("");
      setDescriptionNueva("");
      setFechaInicio("");
      setFechaVencimiento("");
    } catch (error) {
      console.error("Error al crear tarea:", error.response.data.message);
    }
  };

  // DELETE TASKS para eliminar tarea por id
  const eliminarTarea = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTareas(tareas.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };


  // PUT TASKS marcar/desmarcar y editar la tarea
  const actualizarTarea = async (tarea) => {
    try {
      const updated = { ...tarea, completed: !tarea.completed };
      await api.put(`/tasks/${tarea.id}`, updated);
      setTareas(tareas.map((t) => (t.id === tarea.id ? updated : t)));
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start bg-gradient-to-r from-blue-900 to-blue-400 gap-6 py-10">
      <h1 className="text-5xl font-bold text-white text-center mb-6">
        Bienvenido, {nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1).toLowerCase() : ""}
      </h1>


      {/* Formulario para agregar tarea */}
      <div className="dark:bg-gray-800 p-7 rounded-xl shadow-lg w-full max-w-7xl">
        <form className="flex flex-wrap gap-4 items-end" onSubmit={crearTareas}>
          <div className="flex flex-col">
            <label className="block dark:text-white mb-1 font-medium">Nueva Tarea</label>
            <input
              type="text"
              required
              value={tareaNueva}
              onChange={(e) => setTareaNueva(e.target.value)}
              placeholder="Ingresa tu nueva tarea"
              className="w-72 px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-72">
            <label className="block dark:text-white mb-1 font-medium">Descripción</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescriptionNueva(e.target.value)}
              placeholder="Descripción de la tarea"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="block dark:text-white mb-1 font-medium">Fecha Inicio</label>
            <input
              type="date"
              required
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-11"
            />
          </div>

          <div className="flex flex-col">
            <label className="block dark:text-white mb-1 font-medium">Fecha Vencimiento</label>
            <input
              type="date"
              required
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-11"
            />
          </div>

          <button
            type="submit"
            className=" text-white py-2 px-6 rounded-lg transition-all duration-300"
          >
            
          </button>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all duration-300"
          >
            Crear Tarea
          </button>
        </form>
      </div>

      {/* Lista de tareas */}
      <div className="dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-7xl">
        <h2 className="dark:text-white text-3xl font-bold text-center mb-6">
          Tu Lista de Tareas Pendientes
        </h2>

        {tareas.length === 0 ? (
          <p className="text-white text-center">No hay tareas agregadas</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tareas.map((t) => (
              // t. es cada tarea individual
              <div
                key={t.id}
                className={`p-4 rounded-lg shadow-lg ${t.completed ? "bg-green-200" : "bg-white"}`}
              >
                <h3 className={`font-bold text-lg ${t.completed ? "line-through" : ""}`}>
                  {t.title}
                </h3>
                <p className="text-sm">Descripción: {t.description || "-"}</p>
                <p className="text-sm">
                  Inicio: {t.created_at ? new Date(t.created_at).toISOString().split("T")[0] : "-"}
                </p>
                <p className="text-sm">
                  Vencimiento: {t.finished_at ? new Date(t.finished_at).toISOString().split("T")[0] : "-"}
                </p>



                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => actualizarTarea(t)}
                    className={`py-1 px-3 rounded-lg ${t.completed ? "bg-yellow-400" : "bg-green-500 hover:bg-green-800 text-white"
                      }`}
                  >
                    {t.completed ? "Desmarcar" : "Completada"}
                  </button>

                  <button
                    onClick={() => eliminarTarea(t.id)}
                    className="bg-red-500 hover:bg-red-800 text-white py-1 px-3 rounded-lg"
                  >
                    Eliminar
                  </button>

                  <button
                    onClick={() => navigate("/editar", { state: { tarea: t } })}
                    className="bg-yellow-400 hover:bg-yellow-800 text-white py-1 px-3 rounded-lg"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={cerrarSesion}
        className="bg-red-500 hover:bg-red-800 text-white py-2 px-6 rounded-lg transition-all duration-300 mt-6"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
