import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "boxicons/css/boxicons.min.css";
import routes from "./Routes";
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/Login/LoginPage";
import { AuthProvider, useAuth } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route key="login" path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={
            isAuthenticated ? (
              <Layout isShowHeader={!route.isHideHeader} Page={route.page} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
