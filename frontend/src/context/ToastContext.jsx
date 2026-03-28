import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "../utils/classNames";

const TOAST_TIMEOUT_MS = 2600;

const TOAST_TONE = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

const ToastContext = createContext(null);

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <article
          key={toast.id}
          className={cn(
            "pointer-events-auto animate-slide-in rounded-xl border px-3 py-2 shadow-xl backdrop-blur",
            TOAST_TONE[toast.type] || TOAST_TONE.info,
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded-md px-1.5 py-0.5 text-xs font-semibold opacity-80 hover:bg-black/5 hover:opacity-100"
              aria-label="Dismiss toast"
            >
              x
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((toastId) => {
    setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    (message, type = "info") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setToasts((previousToasts) => [...previousToasts, { id, message, type }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, TOAST_TIMEOUT_MS);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
