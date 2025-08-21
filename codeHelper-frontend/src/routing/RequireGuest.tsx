import { Navigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import Loading from '../components/Loading';

export default function RequireGuest({ children } : {children : any}) {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <Loading/>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}
