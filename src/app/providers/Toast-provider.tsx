'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CloseIcon } from '@/src/components/icons';

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
          className={`
            max-w-96
            fixed top-2 right-2
            px-5 py-2
            rounded-lg
            ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            text-white font-bold
            z-50
            shadow-lg
          `}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <div className='flex justify-between items-center'>
            <div>{toast.message}</div>

            <button
              onClick={closeToast}
              className='text-white font-bold  rounded-full p-1 border border-white ml-3 transition  hover:opacity-70'
            >
              <CloseIcon width='20' height='20' />
            </button>
          </div>
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
