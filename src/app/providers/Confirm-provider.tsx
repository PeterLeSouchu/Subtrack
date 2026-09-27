'use client';

import { Button } from '@/src/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

type Params = {
  title: string;
  text: string;
  confirmBtn: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultFn(p: Params) {
  return Promise.resolve(true);
}

const defaultValue = {
  confirmRef: {
    current: defaultFn,
  },
};

const ConfirmContext = createContext(defaultValue);

export function ConfirmProvider({ children }: PropsWithChildren) {
  const confirmRef = useRef(defaultFn);
  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      <ConfirmDialogWithContext />
      {children}
    </ConfirmContext.Provider>
  );
}

export function ConfirmDialogWithContext() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<Params | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resolveRef = useRef((v: boolean) => {});
  const { confirmRef } = useContext(ConfirmContext);

  confirmRef.current = (props: Params) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolveRef.current = resolve;
    });

  function onCancel() {
    setOpen((prev) => !prev);
  }
  function onConfirm() {
    setOpen((prev) => !prev);
    resolveRef.current(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm'
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key='modal-background'
        >
          <motion.div
            role='alertdialog'
            aria-modal='true'
            className='relative w-full max-w-md rounded-3xl bg-white p-6 shadow-float ring-1 ring-ink/5 md:p-7'
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            key='modal-content'
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ring-inset ${
                props?.confirmBtn === 'Supprimer'
                  ? 'bg-red-50 text-red-600 ring-red-100'
                  : 'bg-brand-50 text-brand-600 ring-brand-100'
              }`}
            >
              <AlertTriangle className='h-5 w-5' />
            </span>
            <p className='mb-6 mt-4 text-base text-stattext'>
              {props?.text}

              <span className='font-semibold text-ink'> {props?.title}</span>
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='outline' type='button' onClick={onCancel}>
                Annuler
              </Button>
              <Button
                type='button'
                variant={
                  props?.confirmBtn === 'Supprimer' ? 'destructive' : 'default'
                }
                onClick={onConfirm}
              >
                {props?.confirmBtn}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);

  return {
    confirm: useCallback((p: Params) => {
      return confirmRef.current(p);
    }, []),
  };
}
