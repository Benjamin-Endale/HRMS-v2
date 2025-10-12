"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { authAPI } from '@/app/lib/api/client'; // Import your authAPI
import { logout } from "@/app/lib/actions/auth";
const VerifyOtpPage = () => {
  const inputsRef = useRef([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);




  useEffect(() => {
    inputsRef.current[0]?.focus();
    // Start a 30-second countdown when component mounts
    setCountdown(30);
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

const handleVerify = async () => {
  const otpCode = otp.join("");
  if (otpCode.length !== 6) {
    setError("Please enter the complete 6-digit OTP.");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      otp: otpCode,

    });
    if (result?.error) {
      setError("Invalid OTP. Try again.");
    } else {
      setSuccess("OTP verified successfully! Redirecting...");
      
      // ✅ Let middleware handle the redirection
      // Session is now updated with otpVerified: true
      // Middleware will detect this and redirect to appropriate dashboard
      setTimeout(() => {
        window.location.reload(); // Trigger middleware check
      }, 100);
    }
  } catch (error) {
    setError("An error occurred during verification. Please try again.");
    console.error("OTP verification error:", error);
  } finally {
    setLoading(false);
  }
};
  // const handleCancel = async () => {
  //   try {
  //     // Clear the session first
  //     await logou({ redirect: false });
  //     // Then redirect to login
  //     router.push("/Login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     router.push("/Login");
  //   }
  // };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setError("");
      setSuccess("");
      
      // Use your authAPI to resend OTP
      const response = await authAPI.resendOtp(email);

      if (response.success) {
        setSuccess("OTP resent successfully! Check your email.");
        setCountdown(30); // Reset countdown
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      console.error("Resend OTP error:", error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="font-semibold bg-[url(/image/Login.png)] h-screen center-center bg-no-repeat bg-center">
      <div className="space-y-[3.5625rem] w-[40.875rem] h-[33.5625rem] py-[4.625rem] px-[4.9375rem] border-graysh backdrop-blur-[0.3875rem] bg-[linear-gradient(109deg,rgba(27,31,14,0.05)_0%,rgba(136,136,136,0.01)_102.73%)] border rounded-[56px]">
        <div>
          <h1 className="textFormColor">Enter Verification Code</h1>
          <h4 className="text-limegray">
            We sent a code to <span className="font-bold">{email}</span>
          </h4>
        </div>

        <div className="flex gap-[1rem] flex-col">
          <span className="text-formColor">Enter OTP</span>
          <div className="flex items-center gap-[1.1875rem]">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="OtpConfig text-center text-formColor text-2xl"
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                disabled={loading}
              />
            ))}
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          
          <div className="flex items-center justify-end">
            <span className="text-limegray">Didn't receive code?</span>
            <button
              className="text-lemongreen cursor-pointer ml-2 disabled:opacity-50"
              type="button"
              onClick={handleResend}
              disabled={resendLoading || countdown > 0}
            >
              {resendLoading ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
            </button>
          </div>
        </div>

        <div className="cursor-pointer flex gap-[11px] ">
          <div className="center-center w-[15.25rem] h-[3.4375rem] rounded-[10px] bg-inherit border-2 border-graysh">
            <button
              className="cursor-pointer w-full h-full text-formColor disabled:opacity-50"
              type="button"
              onClick={()=>logout()}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          <div className="center-center w-[15.25rem] h-[3.4375rem] rounded-[10px] bg-lemongreen">
            <button
              className="cursor-pointer w-full h-full text-black disabled:opacity-50"
              type="button"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;