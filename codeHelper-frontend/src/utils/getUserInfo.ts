import { backend_url } from './getBackendUrl';
export function getUserInfo(): Promise<any> {
  return fetch(`${backend_url}/getUser`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data);
}