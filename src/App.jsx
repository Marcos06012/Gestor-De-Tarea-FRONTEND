import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ListaDeTareas from "./pages/ListaDeTareas";
import EditarTarea from "./pages/EditarTarea";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          {/* Página de login */}
        <Route path="/login" element={<Login />} />          {/* Página de login */}
        <Route path="/registro" element={<Registro />} /> {/* Página de registro */}


        <Route
          path="/tareas"
          element={
            <ProtectedRoute>
              <ListaDeTareas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editar"
          element={
            <ProtectedRoute>
              <EditarTarea />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

