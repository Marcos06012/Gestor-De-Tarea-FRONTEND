import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registro() {
  const navigate = useNavigate();
  const [Usuario, setUsuario] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirmar, setConfirmar] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página
    setIsClicked(true);

    // Validaciones simples
    if (!Usuario || !Correo || !Password || !Confirmar) {
      alert("Por favor completa todos los campos");
      setIsClicked(false);
      return;
    }
    if (Password !== Confirmar) {
      alert("Las contraseñas no coinciden");
      setIsClicked(false);
      return;
    }

    try{
      const response = await axios.post("http://localhost:3001/register", {
        name: Usuario,
        email: Correo,
        password: Password,
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Registro exitoso");
      navigate("/login", { state: { User: Usuario } });
    }catch(error){  
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        alert("Error: " + (error.response.data.message || error.response.data.error) || "Error en el registro");
      }else{
        alert("Error en el registro");
      }
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 gap-6">
      <h1 className="text-5xl font-bold text-white text-center mb-6">
        REGISTRO DE USUARIO
      </h1>

      <div className="dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="dark:text-white text-2xl font-bold text-center mb-6">
          Por favor, ingresa tus datos
        </h2>

        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* Usuario */}
          <div>
            <label htmlFor="usuario" className="block dark:text-white font-medium mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="usuario"
              required
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="correo" className="block dark:text-white font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              required
              placeholder="Ingresa tu correo electrónico"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block dark:text-white font-medium mb-1">
              Contraseña nueva
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Ingresa tu nueva contraseña"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmar" className="block dark:text-white font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmar"
              required
              placeholder="Confirma tu contraseña"
              className="w-full px-4 py-2 border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition-all duration-300 ${isClicked
                ? "bg-blue-700 transform scale-95 animate-pulse"
                : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            Registrarse
          </button>
        </form>

        {/* Enlace a Login */}
        <p className="text-sm text-center dark:text-white mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Iniciar Sesión
          </span>
        </p>
      </div>
    </div>
  );
}
