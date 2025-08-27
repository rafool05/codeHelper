import { backend_url } from './getBackendUrl';
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null); // null = loading, true/false = result

  useEffect(() => {
    async function checkAuth() {
      try {
  const response = await fetch(`${backend_url}/isAuth`, {
          credentials: 'include', // Important! Sends cookies along with the request
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  return isAuthenticated;
}
