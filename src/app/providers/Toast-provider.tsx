'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = {
  message: string;
  type: 'error' | 'success';
};

type ToastContextType = {
  showToast: (message: string, type: 'success' | 'error') => void;
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

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export function Toast() {
  const { toast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={`
              fixed top-2 right-2
              px-5 py-2
              rounded-lg
              ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
              text-white font-bold
              z-50
              shadow-lg
            `}
          initial={{ opacity: 0, x: 100 }} // Commence à droite, invisible
          animate={{ opacity: 1, x: 0 }} // Devient visible et se place au centre
          exit={{ opacity: 0, x: 100 }} // Disparaît en se déplaçant vers la droite
          transition={{
            duration: 0.5, // Durée de l'animation
            ease: 'easeInOut',
          }}
        >
          {toast.message}
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
