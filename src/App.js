import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmotionRecognition from "./EmotionRecognition";
import LoginPage from "./LoginPage.js";
import Signup from "./SignupPage";
import { AuthProvider } from "./AuthContext";
import RouteGuard from "./RouteGuard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <RouteGuard>
                <EmotionRecognition />
              </RouteGuard>
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
