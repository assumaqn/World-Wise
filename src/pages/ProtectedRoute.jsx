import { useEffect } from "react";
import { useAuth } from "../Context/FackAuthContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  });
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
