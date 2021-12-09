import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  PostPage,
  Profile,
  Login,
  Register,
  User,
  NotFound,
} from "./pages";
import { Navbar } from "./components";

import { UserProvider } from "./context/user/UserContext";
import { ErrorProvider } from "./context/errorContext/ErrorContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <ErrorProvider>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
