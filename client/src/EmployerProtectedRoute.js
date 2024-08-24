import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

const EmployerProtectedRoute = ({ children }) => {
  const { isLoading, isEmployer } = useSelector((state) => state.employer);
  if (isLoading === false) {
    if (!isEmployer) {
      return <Navigate to={`/employer/login`} replace />;
    }
    return children;
  }
};

export default EmployerProtectedRoute;