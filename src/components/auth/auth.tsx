import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
interface User {
  id: number;
  full_name: string;
  email: string;
  auth_type: string;
  type: string;
  is_verified?: number; // optional, in case it’s missing
}
const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<User | null>(null);

  const handleSuccess = (user: User) => {
    console.log("Authenticated user:", user);
    setUser(user);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {mode === "login" ? (
          <Login onSuccess={handleSuccess} />
        ) : (
          <Register onSuccess={handleSuccess} />
        )}

        {user && (
          <div className="mt-4 text-sm text-gray-700">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;