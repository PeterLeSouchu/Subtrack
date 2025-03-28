'use client';

import { Button } from '@/src/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
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
          className='fixed  inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          key='modal-background'
        >
          <motion.div
            className=' bg-white rounded-lg max-w-2xl min-w-64 w-1/3  p-6 shadow-lg relative'
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key='modal-content'
          >
            <p className='mb-4 text-center font-medium text-lg text-gray-600'>
              {props?.text}

              <span className='font-bold'> {props?.title}</span>
            </p>
            <div className='flex justify-end space-x-4'>
              <Button type='button' onClick={onCancel}>
                Annuler
              </Button>
              <Button
                type='button'
                className='px-4 py-2 bg-blue-600 bg-navbar lg:hover:bg-blue transition  rounded '
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
