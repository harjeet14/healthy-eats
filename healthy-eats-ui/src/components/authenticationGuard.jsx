import { Navigate } from "react-router-dom";

export function AuthenticationGuard({ children }) {

    const login = !!sessionStorage.logedIn;

    if (!login) {

        return <Navigate to="/login" />
    }

    return children;
}