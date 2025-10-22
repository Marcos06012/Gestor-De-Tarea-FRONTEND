import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // Si el login es exitoso guardamos el token
        const { token, message, username, userEmail} = response.data;
        console.log(username, userEmail);
        if (token) {
          // Guardar el token en localStorage
          localStorage.setItem("token", token);
          // Guardo localmente el email del usuario y el usuario
          localStorage.setItem("userEmail", userEmail);
          localStorage.setItem("userName" , username);
          console.log("Respuesta del servidor:", response.data);
          alert("Inicio de sesión exitoso");
          // Enviamos al usuario a la pagina Lista de Tareas
          navigate("/tareas", { state: { userEmail: username } });
        } else {
          console.error('Login no devolvió token:', response.data);
          alert(response.data.message || response.data.error || 'Error en el inicio de sesión');
        }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        alert("Error: " + error.response.data.message || "Error en el inicio de sesión");
      } else {
        alert("Error en el inicio de sesión");
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 gap-6">
      <h1 className="text-6xl font-bold text-white text-center mb-6">
        GESTOR DE TAREAS
      </h1>

      <div className="dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="dark:text-white text-2xl font-bold text-center mb-6">
          Iniciar Sesión
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Correo */}
          <div>
            <label
              htmlFor="email"
              className="block dark:text-white font-medium mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Escribe tu correo electrónico"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block dark:text-white font-medium mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Escribe tu contraseña"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Boton de enlace a Lista de Tareas */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300"
          >
            Entrar
          </button>

          {/* Enlace a registro */}
          <p className="text-sm text-center dark:text-white mt-4">
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => navigate("/registro")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Regístrate
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
