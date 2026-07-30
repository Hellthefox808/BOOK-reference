"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Check, KeyRound, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useReaderStore } from "@/store/useReaderStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { theme, setTheme } = useReaderStore();
  const { login } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Password strength meter calculation
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  }, [password]);

  // Interactive Particle & Waves Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";
      ctx.fillStyle = isDark ? "rgba(205, 165, 127, 0.15)" : "rgba(125, 81, 45, 0.12)";
      ctx.strokeStyle = isDark ? "rgba(205, 165, 127, 0.05)" : "rgba(125, 81, 45, 0.05)";

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, reduceMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      setShowOTPModal(true);
    } else {
      login(email || "reader@bookverse.com", name || "Coffee Reader");
      router.push("/");
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "reader@bookverse.com", name || "Coffee Reader");
    setShowOTPModal(false);
    router.push("/");
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6efe7] px-4 py-12 transition-colors duration-300 dark:bg-[#100d0c]">
        {/* Background Animation Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Auth Glassmorphism Card */}
        <motion.div
          className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-stone-200/80 bg-white/75 p-8 shadow-2xl backdrop-blur-2xl dark:border-stone-800/80 dark:bg-stone-950/60 sm:p-10"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Header Brand */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-900 text-amber-100 shadow-md dark:bg-amber-100 dark:text-stone-950">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 dark:text-amber-300">
                  BookVerse
                </p>
                <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Auth Portal
                </h1>
              </div>
            </Link>

            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="my-6 grid grid-cols-2 gap-1.5 rounded-2xl bg-stone-100/80 p-1 dark:bg-stone-900/80">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-xl py-2 text-xs font-bold transition ${
                mode === "login"
                  ? "bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-xl py-2 text-xs font-bold transition ${
                mode === "register"
                  ? "bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Wright"
                  className="mt-1 w-full rounded-2xl border border-stone-300/80 bg-stone-50/80 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@bookverse.com"
                  className="w-full rounded-2xl border border-stone-300/80 bg-stone-50/80 pl-10 pr-4 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-[11px] font-semibold text-amber-800 hover:underline dark:text-amber-300"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-stone-300/80 bg-stone-50/80 pl-10 pr-10 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Meter for Registration */}
              {mode === "register" && password && (
                <div className="mt-2.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          passwordStrength >= step
                            ? passwordStrength <= 2
                              ? "bg-amber-500"
                              : "bg-emerald-600"
                            : "bg-stone-200 dark:bg-stone-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-1 block text-[10px] text-stone-500">
                    Strength: {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Moderate" : "Strong (8+ chars, uppercase, number, symbol)"}
                  </span>
                </div>
              )}
            </div>

            {/* Remember Me Checkbox */}
            {mode === "login" && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded accent-amber-800 dark:accent-amber-300"
                />
                <label htmlFor="remember" className="text-xs font-medium text-stone-600 dark:text-stone-400">
                  Keep me signed in on this browser
                </label>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
            >
              <span>{mode === "login" ? "Sign In to Library" : "Create Account & Verify"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social OAuth Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Or Continue With
            </span>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>

          <button
            onClick={() => {
              login("google.user@bookverse.com", "Google Reader");
              router.push("/");
            }}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-stone-300 bg-white/90 py-2.5 text-xs font-bold text-stone-800 shadow-sm transition hover:bg-white dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google OAuth 2.0
          </button>
        </motion.div>
      </main>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-950 text-center">
            <KeyRound className="mx-auto h-10 w-10 text-amber-800 dark:text-amber-300" />
            <h3 className="mt-3 text-lg font-bold text-stone-900 dark:text-stone-100">
              Verify Your Email
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Enter the 6-digit OTP sent to {email || "your email"}.
            </p>

            <form onSubmit={handleVerifyOTP} className="mt-5 space-y-4">
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...otpCode];
                      newCode[idx] = e.target.value;
                      setOtpCode(newCode);
                    }}
                    className="h-10 w-10 rounded-xl border border-stone-300 text-center text-base font-bold outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-amber-900 py-2.5 text-xs font-bold text-white dark:bg-amber-100 dark:text-stone-950"
              >
                Verify & Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-950">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Reset Password
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              We will send a password reset link to your registered email.
            </p>

            {resetEmailSent ? (
              <div className="my-6 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="mx-auto h-8 w-8 mb-2" />
                Reset link successfully sent! Check your inbox.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetEmailSent(true);
                  setTimeout(() => {
                    setShowForgotPasswordModal(false);
                    setResetEmailSent(false);
                  }, 1500);
                }}
                className="mt-4 space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="reader@bookverse.com"
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="flex-1 rounded-full border border-stone-300 py-2 text-xs font-bold text-stone-700 dark:border-stone-700 dark:text-stone-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-amber-900 py-2 text-xs font-bold text-white dark:bg-amber-100 dark:text-stone-950"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
