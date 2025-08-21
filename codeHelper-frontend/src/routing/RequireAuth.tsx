import { Navigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import Loading from '../components/Loading';

export default function RequireAuth({ children } : {children : any}) {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <Loading/>; // Or a spinner
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
}
  return children;
}
