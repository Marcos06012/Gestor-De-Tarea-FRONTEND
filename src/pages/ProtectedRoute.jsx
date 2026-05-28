import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // Si no hay token lo vamos redirigir al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        // Aqui decodificamos el token para verificar la validez
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        // Si todo esta bien pues mostramos el componente protegido
        return children;
    } catch (error) {
        // Si el token es inválido o no se puede decodificar
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
}
