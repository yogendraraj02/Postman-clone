import { createBrowserRouter } from 'react-router-dom';
// import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
// Import other pages as needed

const createRoutes = (isAuthenticated, toggleSidebar, promptAuth, isSidebarOpen) => createBrowserRouter([
  {
    path: "/",
    element: <Layout
      isAuthenticated={isAuthenticated} 
      toggleSidebar={toggleSidebar} 
      promptAuth={promptAuth}
      isSidebarOpen={isSidebarOpen}
    />,
    errorElement : <ErrorPage />,
    children: [
      {
        index: true,
        
        element: <Dashboard isAuthenticated={isAuthenticated} />,
      },
      // Add more routes here
      // {
      //   path: "profile",
      //   element: <Profile isAuthenticated={isAuthenticated} />
      // },
    ]
  },
  // You can add more top-level routes here if needed
]);

export default createRoutes;