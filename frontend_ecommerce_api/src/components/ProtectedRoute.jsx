import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode }g from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const location = useLocation();
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	let decoded;
	try {
		decoded = jwtDecode(token);
	} catch {
		localStorage.removeItem("token");
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	const userRol = decoded.rol;

	if (allowedRoles && !allowedRoles.includes(userRol)) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
