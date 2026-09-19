import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Activity,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  MapPin,
  Sparkles,
  Loader2,
  Building2,
  Users,
} from "lucide-react";
import Button from "./ui/Button";

export const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  // Sync mode when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setNotice(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsLoading(false);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLoading]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Email format validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password Strength Evaluation for Sign Up
  const passwordStrength = useMemo(() => {
    const pwd = signupData.password || "";
    const hasMinLength = pwd.length >= 8;
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasMixedCase = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecialChar) score += 1;
    if (hasMixedCase) score += 1;

    let label = "Too Weak";
    let color = "bg-rose-500";
    let textColor = "text-rose-400";

    if (score === 1) {
      label = "Weak";
      color = "bg-rose-500";
      textColor = "text-rose-400";
    } else if (score === 2) {
      label = "Fair";
      color = "bg-amber-500";
      textColor = "text-amber-400";
    } else if (score === 3) {
      label = "Good";
      color = "bg-sky-500";
      textColor = "text-sky-400";
    } else if (score >= 4) {
      label = "Strong";
      color = "bg-emerald-500";
      textColor = "text-emerald-400";
    }

    return {
      score,
      label,
      color,
      textColor,
      hasMinLength,
      hasNumber,
      hasSpecialChar,
      hasMixedCase,
    };
  }, [signupData.password]);

  // Check if confirm password matches
  const confirmPasswordState = useMemo(() => {
    if (!signupData.confirmPassword) return null;
    return signupData.password === signupData.confirmPassword ? "match" : "mismatch";
  }, [signupData.password, signupData.confirmPassword]);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(loginData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotice(null);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setNotice(null);

    // Realistic UI loading state demonstration
    setTimeout(() => {
      setIsLoading(false);
      setNotice({
        type: "preview",
        title: "Authentication UI Preview",
        text: "User login and session management will be activated in the upcoming backend architecture release. No fake authentication or session tokens are created.",
      });
    }, 850);
  };

  // Handle Sign Up submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(signupData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!signupData.agreeTerms) {
      newErrors.agreeTerms = "You must accept the Terms and Privacy Policy to proceed";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotice(null);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setNotice(null);

    // Realistic UI loading state demonstration
    setTimeout(() => {
      setIsLoading(false);
      setNotice({
        type: "preview",
        title: "Registration UI Preview",
        text: "Citizen account registration and role storage will be connected in the upcoming backend architecture release. No passwords or dummy data are stored.",
      });
    }, 850);
  };

  // Handle Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setNotice({
      type: "info",
      title: "Password Recovery Service",
      text: "Automated password recovery emails will be available as part of the municipal notification backend launch.",
    });
  };

  // Handle Google OAuth placeholder
  const handleGoogleAuth = () => {
    setNotice({
      type: "info",
      title: "Social Authentication",
      text: "Google OAuth integration will be connected in the upcoming authentication provider release.",
    });
  };

  // Switch modes smoothly
  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setNotice(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop with soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            onClick={!isLoading ? onClose : undefined}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col lg:grid lg:grid-cols-12"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 z-20" />

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT COLUMN: CivicPulse Branding & Storytelling (Desktop & Large screens) */}
            <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 xl:p-10 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900 border-r border-slate-800/80 overflow-hidden">
              {/* Subtle Ambient Glows */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

              {/* Decorative City / Node Grid Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Top Branding */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                      CivicPulse
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                      Civic Engagement System
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-black text-slate-100 tracking-tight leading-snug">
                    Your voice.<br />
                    Your neighborhood.<br />
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Your impact.
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    Connecting proactive residents directly with municipal services for faster response, full transparency, and cleaner urban neighborhoods.
                  </p>
                </div>
              </div>

              {/* Middle Civic Network Visual Elements */}
              <div className="relative z-10 my-6 space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm backdrop-blur-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200">Precise Geotagged Reports</p>
                    <p className="text-[11px] text-slate-400">Potholes, streetlights, and sanitation tracked with GPS</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm backdrop-blur-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200">Public Accountability</p>
                    <p className="text-[11px] text-slate-400">100% transparent status timeline from review to resolution</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm backdrop-blur-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200">Community Driven</p>
                    <p className="text-[11px] text-slate-400">Empowering thousands of residents to co-create better cities</p>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Badge */}
              <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Civic Tech Platform</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700/60">
                  Version 2.0
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Form Surface */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-y-auto max-h-[92vh] p-4 sm:p-8 lg:p-10 bg-slate-900">
              <div>
                {/* Mobile Branding Header (visible only on smaller screens) */}
                <div className="lg:hidden flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      CivicPulse
                    </span>
                    <p className="text-[10px] font-medium text-slate-400">
                      Citizen Community Platform
                    </p>
                  </div>
                </div>

                {/* Form Header */}
                <div className="mb-6">
                  <h2
                    id="auth-modal-title"
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100"
                  >
                    {mode === "login" ? "Welcome back" : "Join CivicPulse"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    {mode === "login"
                      ? "Stay connected with the civic issues and community improvements that matter to your neighborhood."
                      : "Help make your community cleaner, safer, and better through collective civic action."}
                  </p>
                </div>

                {/* Preview / Informational Notice */}
                {notice && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3.5 rounded-2xl bg-blue-950/70 border border-blue-800/90 text-blue-200 text-xs flex items-start gap-3 shadow-inner"
                  >
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-100">{notice.title}</p>
                      <p className="text-[11px] text-blue-200/90 leading-relaxed">
                        {notice.text}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Social Auth Placeholder (Google) */}
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/70 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center mt-5">
                    <div className="w-full border-t border-slate-800" />
                    <span className="absolute px-3 bg-slate-900 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* LOGIN FORM */}
                {mode === "login" && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          value={loginData.email}
                          autoComplete="email"
                          onChange={(e) => {
                            setLoginData({ ...loginData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: null });
                          }}
                          placeholder="name@neighborhood.org"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-800/80 text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.email
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">
                          Password <span className="text-rose-400">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          autoComplete="current-password"
                          onChange={(e) => {
                            setLoginData({ ...loginData, password: e.target.value });
                            if (errors.password) setErrors({ ...errors, password: null });
                          }}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-11 py-2.5 rounded-xl border bg-slate-800/80 text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.password
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.password}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full shadow-lg shadow-blue-500/25 font-bold cursor-pointer"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Verifying Credentials...</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5">
                            <span>Sign In to CivicPulse</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}

                {/* SIGN UP FORM */}
                {mode === "signup" && (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={signupData.name}
                          autoComplete="name"
                          onChange={(e) => {
                            setSignupData({ ...signupData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: null });
                          }}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.name
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          value={signupData.email}
                          autoComplete="email"
                          onChange={(e) => {
                            setSignupData({ ...signupData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: null });
                          }}
                          placeholder="name@neighborhood.org"
                          className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.email
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Password + Strength Indicator */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Password <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={signupData.password}
                          autoComplete="new-password"
                          onChange={(e) => {
                            setSignupData({ ...signupData, password: e.target.value });
                            if (errors.password) setErrors({ ...errors, password: null });
                          }}
                          placeholder="Minimum 8 characters"
                          className={`w-full pl-10 pr-11 py-2 text-xs sm:text-sm rounded-xl border bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.password
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {signupData.password.length > 0 && (
                        <div className="mt-2 space-y-1.5 p-2.5 rounded-xl bg-slate-800/50 border border-slate-750">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-medium">Strength:</span>
                            <span className={`font-bold ${passwordStrength.textColor}`}>
                              {passwordStrength.label}
                            </span>
                          </div>

                          {/* 4-bar progress */}
                          <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`h-full rounded-full transition-all duration-300 ${
                                  passwordStrength.score >= step
                                    ? passwordStrength.color
                                    : "bg-slate-700/60"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Checklist Requirements */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[10px] text-slate-400">
                            <span className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? "text-emerald-400 font-semibold" : ""}`}>
                              <Check className={`w-3 h-3 ${passwordStrength.hasMinLength ? "text-emerald-400" : "text-slate-600"}`} />
                              <span>8+ Characters</span>
                            </span>
                            <span className={`flex items-center gap-1 ${passwordStrength.hasNumber ? "text-emerald-400 font-semibold" : ""}`}>
                              <Check className={`w-3 h-3 ${passwordStrength.hasNumber ? "text-emerald-400" : "text-slate-600"}`} />
                              <span>At least 1 number</span>
                            </span>
                            <span className={`flex items-center gap-1 ${passwordStrength.hasSpecialChar ? "text-emerald-400 font-semibold" : ""}`}>
                              <Check className={`w-3 h-3 ${passwordStrength.hasSpecialChar ? "text-emerald-400" : "text-slate-600"}`} />
                              <span>Special symbol</span>
                            </span>
                            <span className={`flex items-center gap-1 ${passwordStrength.hasMixedCase ? "text-emerald-400 font-semibold" : ""}`}>
                              <Check className={`w-3 h-3 ${passwordStrength.hasMixedCase ? "text-emerald-400" : "text-slate-600"}`} />
                              <span>Upper & lower case</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {errors.password && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.password}</span>
                        </p>
                      )}
                    </div>

                    {/* Confirm Password + Live Match Feedback */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">
                          Confirm Password <span className="text-rose-400">*</span>
                        </label>
                        {confirmPasswordState === "match" && (
                          <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Passwords match</span>
                          </span>
                        )}
                        {confirmPasswordState === "mismatch" && (
                          <span className="text-[10px] font-semibold text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Passwords do not match</span>
                          </span>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={signupData.confirmPassword}
                          autoComplete="new-password"
                          onChange={(e) => {
                            setSignupData({ ...signupData, confirmPassword: e.target.value });
                            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                          }}
                          placeholder="Re-enter your password"
                          className={`w-full pl-10 pr-11 py-2 text-xs sm:text-sm rounded-xl border bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                            errors.confirmPassword || confirmPasswordState === "mismatch"
                              ? "border-rose-500 focus:ring-rose-500/20"
                              : confirmPasswordState === "match"
                              ? "border-emerald-500/80 focus:border-emerald-400 focus:ring-emerald-400/20"
                              : "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.confirmPassword}</span>
                        </p>
                      )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={signupData.agreeTerms}
                          onChange={(e) => {
                            setSignupData({ ...signupData, agreeTerms: e.target.checked });
                            if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: null });
                          }}
                          className="mt-0.5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-cyan-400/20"
                        />
                        <span className="text-xs text-slate-400 leading-tight">
                          I agree to the{" "}
                          <span className="text-slate-200 underline">Terms of Service</span>{" "}
                          and{" "}
                          <span className="text-slate-200 underline">Privacy Policy</span>.
                        </span>
                      </label>
                      {errors.agreeTerms && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.agreeTerms}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full shadow-lg shadow-blue-500/25 font-bold cursor-pointer"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Creating Citizen Profile...</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5">
                            <span>Create Citizen Account</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Mode Switch Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 text-center">
                {mode === "login" ? (
                  <p className="text-xs text-slate-400">
                    Don't have a citizen account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signup")}
                      disabled={isLoading}
                      className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline cursor-pointer ml-1"
                    >
                      Create an account
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      disabled={isLoading}
                      className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline cursor-pointer ml-1"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
