import React, { useState } from "react";
import { toast } from "react-toastify";
import OtpPopup from "../otp/otp";
interface RegisterProps {
  onSuccess: (data: { fullName: string; email: string; password: string ,data_auth:string}) => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false });
  const [errors, setErrors] = useState({ fullName: "", email: "", password: "" });
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = { fullName: "", email: "", password: "" };
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return newErrors;
  };
const onVerifySuccess=()=>{
  toast.success('OTP verified! You can now login.')
}
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setTouched({ fullName: true, email: true, password: true });
  const newErrors = validate();
  const isValid = !Object.values(newErrors).some(err => err !== "");

  if (!isValid) return;

  const response = await fetch("http://192.168.1.19/backend_php_hridaya/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: fullName,
      email: email,
      password: password
    })
  });

  const data = await response.json();

  if (data.success) {
    toast.success(data.message);

     setShowOtpPopup(true);
    return;
  }


  onSuccess({ fullName, email, password, data_auth: "register" });

  setFullName("");
  setEmail("");
  setPassword("");
};

  const handleBlur = (field: "fullName" | "email" | "password") => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  return (
<>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold text-center">Create Account</h3>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => handleBlur("fullName")}
          className={`px-3 py-2 rounded-md border focus:outline-none ${
            touched.fullName && errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {touched.fullName && errors.fullName && (
          <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
        )}
      </div>

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
            touched.password && errors.password ? "border-red-500" : "border-gray-300"
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

      <button className="mt-2 rounded-md bg-yellow-400 py-2 font-semibold hover:bg-yellow-500 transition">
        Register
      </button>
    </form>
        {/* OTP Popup */}
      <OtpPopup
        isOpen={showOtpPopup}
        email={email}
        onClose={() => setShowOtpPopup(false)}
        onVerifySuccess={onVerifySuccess   }
      />
</>
  );
};

export default Register;