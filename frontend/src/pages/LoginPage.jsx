import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_PASSWORD = "demo123";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectPath = location.state?.from || "/";

  const attemptLogin = async (nextEmail, nextPassword) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login({ email: nextEmail, password: nextPassword });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Invalid login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await attemptLogin(email, password);
  };

  const quickLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword(DEMO_PASSWORD);
    await attemptLogin(demoEmail, DEMO_PASSWORD);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100 via-slate-100 to-teal-100" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/50 bg-white/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">EpicManagement</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-600">Login to access your SaaS dashboard.</p>
        </header>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => quickLogin("admin@gmail.com")}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login as Admin
          </button>
          <button
            type="button"
            onClick={() => quickLogin("superadmin@gmail.com")}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login as Super Admin
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@gmail.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white pr-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border-none bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {errorMessage ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
