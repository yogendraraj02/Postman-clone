import { useMemo, useState } from 'react'
import './App.css'
import './Responsive.css'
import AuthPopup from './pages/AuthPopup'
import {  RouterProvider } from 'react-router-dom';

import createRoutes from './routes'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const promptAuth = () => setShowAuthPopup(true);
  const closeAuthPopup = () => setShowAuthPopup(false);
  const handleAuthentication = (success) => {
    if (success) {
      setIsAuthenticated(true);
      setShowAuthPopup(false);
    }
  };

  

  const router = useMemo(() => createRoutes(isAuthenticated, toggleSidebar, promptAuth, isSidebarOpen), 
  [isAuthenticated, isSidebarOpen]);

return (
  <>
    <RouterProvider router={router} />
    <AuthPopup 
      show={showAuthPopup} 
      onClose={closeAuthPopup} 
      onAuthenticate={handleAuthentication}
    />
  </>
);
}
export default App;
