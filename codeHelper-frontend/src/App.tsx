import { ToastContainer } from 'react-toastify';
import './App.css';
import Landing from './components/Landing/Landing.tsx';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/Dashboard/Dashboard.tsx';
import CollaborativeEditor from './components/Editor/CollaborativeEditor.tsx';
import RequireAuth from './routing/RequireAuth';
import RequireGuest from './routing/RequireGuest';
import { RequireRoomAccess } from './routing/RequireRoomAccess.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/signup"
            element={
              <RequireGuest>
                <Signup />
              </RequireGuest>
            }
          />
          <Route
            path="/signin"
            element={
              <RequireGuest>
                <Signin />
              </RequireGuest>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/editor/:room_id"
            element={
              <RequireAuth>
                <RequireRoomAccess>

                  <CollaborativeEditor />
                </RequireRoomAccess>
              </RequireAuth>  
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
