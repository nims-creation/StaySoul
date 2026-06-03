import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info:    (msg, dur) => addToast(msg, 'info', dur),
  };

  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-700', text: 'text-green-800 dark:text-green-300', icon_cls: 'text-green-500' },
    error:   { icon: XCircle,    bg: 'bg-red-50 dark:bg-red-900/30',   border: 'border-red-200 dark:border-red-700',   text: 'text-red-800 dark:text-red-300',   icon_cls: 'text-red-500' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-700', text: 'text-amber-800 dark:text-amber-300', icon_cls: 'text-amber-500' },
    info:    { icon: Info,        bg: 'bg-blue-50 dark:bg-blue-900/30',  border: 'border-blue-200 dark:border-blue-700',  text: 'text-blue-800 dark:text-blue-300',  icon_cls: 'text-blue-500' },
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-24 right-4 z-[99999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        {toasts.map(t => {
          const c = config[t.type] || config.info;
          const Icon = c.icon;
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-premium ${c.bg} ${c.border} animate-in slide-in-from-right-4 duration-300`}
            >
              <Icon size={18} className={`${c.icon_cls} shrink-0 mt-0.5`} />
              <p className={`text-sm font-semibold flex-1 ${c.text}`}>{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className={`${c.icon_cls} opacity-60 hover:opacity-100 transition-opacity shrink-0`}
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
