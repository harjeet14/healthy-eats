import { Navigate } from "react-router-dom";

export function AuthenticationGuard({ children }) {

    const login = !!sessionStorage.sessionUserFullName;

    if (!login) {

        return <Navigate to="/login" />
    }

    return children;
}