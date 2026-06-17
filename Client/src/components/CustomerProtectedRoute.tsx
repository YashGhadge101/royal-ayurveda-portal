import { Navigate, useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const CustomerProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const token = localStorage.getItem("customerToken");

    // If there is no token, redirect to the new /auth page
    // We pass the 'state' so after they log in, we can send them exactly back to where they were trying to go!
    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default CustomerProtectedRoute;