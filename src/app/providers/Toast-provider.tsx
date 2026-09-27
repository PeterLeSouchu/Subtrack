'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

type ToastType = {
  message: string;
  type: 'error' | 'success';
};

type ToastContextType = {
  showToast: (message: string, type: 'success' | 'error') => void;
  closeToast: () => void;
  toast: ToastType | null;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });

    setTimeout(() => setToast(null), 5000);
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast, toast }}>
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export function Toast() {
  const { toast, closeToast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role={toast.type === 'error' ? 'alert' : 'status'}
          className='fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border border-line bg-white p-4 text-ink shadow-pop'
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.25,
            ease: 'easeOut',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-600' />
          ) : (
            <AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-red-600' />
          )}
          <p className='flex-1 text-sm font-medium'>{toast.message}</p>
          <button
            onClick={closeToast}
            aria-label='Fermer la notification'
            className='rounded-md p-1 text-stattext transition-colors hover:bg-slate-100 hover:text-ink'
          >
            <X className='h-4 w-4' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
