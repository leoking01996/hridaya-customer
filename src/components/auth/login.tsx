import React, { useState } from "react";
import ResetPasswordPopup from "./resetpw";
import { toast } from "react-toastify";
interface User {
  id: number;
  full_name: string;
  email: string;
  auth_type: string;
  type: string;
  is_verified?: number; // optional, in case it’s missing
  phone_no:number,
  profile_pic:string,
  address:string
}
interface LoginProps {
  onSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [showResetPopup, setShowResetPopup] = useState(false);
const [userData, setUserData] = useState<User | null>(() => {
  const stored = sessionStorage.getItem("user");
  return stored ? (JSON.parse(stored) as User) : null;
});
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Email is invalid";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return newErrors;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // ... your validation logic

  try {
    const res = await fetch("http://localhost/backend_php_hridaya/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success && data.user) {
      // Map API response to User type
      const user: User = {
        id: data.user.id,
        full_name: data.user.full_name,
        email: data.user.email,
        auth_type: data.user.auth_type,
        type: data.user.type,
        is_verified: data.user.is_verified,
        phone_no:data.user.phone_no,
        profile_pic:data.user.profile_pic,
        address:data.user.address,
      };

      // Store in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Trigger Navigation update
      onSuccess(user);
toast.success(data.message)
      // Reset form
      setEmail("");
      setPassword("");
      setTouched({ email: false, password: false });
      setErrors({ email: "", password: "" });
      setServerError("");
    } else {
      setServerError(data.message || "Login failed");
    }
  } catch (err) {
    setServerError("Server error, try again later");
    console.error(err);
  }
};
const forgotPassword = () => {
  setShowResetPopup(true);
};

  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  return (
 <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold text-center">Welcome Back</h3>

      {serverError && <p className="text-red-500 text-center">{serverError}</p>}

      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          className={`px-3 py-2 rounded-md border focus:outline-none ${
            touched.email && errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {touched.email && errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          className={`w-full px-3 py-2 rounded-md border focus:outline-none pr-10 ${
            touched.password && errors.password
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {touched.password && errors.password && (
          <span className="text-red-500 text-sm mt-1">{errors.password}</span>
        )}
      </div>
<a
  className="cursor-pointer hover:text-gray-600"
  onClick={forgotPassword}
>
  Forgot password?
</a>
      <button className="mt-2 rounded-md bg-yellow-400 py-2 font-semibold hover:bg-yellow-500 transition">
        Login
      </button>
      
    </form>
    <ResetPasswordPopup
  isOpen={showResetPopup}
  onClose={() => setShowResetPopup(false)}
/>
    </>
    
  );
};

export default Login;