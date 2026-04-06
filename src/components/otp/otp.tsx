
import React, { useState } from "react";
import Popup from "../popup-modules/auth/popupProps";
import { toast } from "react-toastify";

interface OtpPopupProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerifySuccess: () => void;
}

const OtpPopup: React.FC<OtpPopupProps> = ({ isOpen, email, onClose, onVerifySuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return setError("Enter OTP");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://192.168.1.19/backend_php_hridaya/verify_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (data.success) {
        onVerifySuccess();
        onClose();
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} title="Verify OTP" onClose={onClose}>
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Enter the OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter OTP"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </Popup>
  );
};

export default OtpPopup;