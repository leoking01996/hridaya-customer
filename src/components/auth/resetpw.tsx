import React, { useState } from "react";
import Popup from "../popup-modules/auth/popupProps";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      "http://192.168.1.19/backend_php_hridaya/reset-pw.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      setEmail("");
      setPassword("");
      onClose();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Reset Password">
      <form onSubmit={handleReset} className="flex flex-col gap-3">

        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded-md px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="border rounded-md px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-yellow-400 py-2 rounded-md font-semibold hover:bg-yellow-500">
          Reset Password
        </button>

      </form>
    </Popup>
  );
};

export default ResetPasswordPopup;