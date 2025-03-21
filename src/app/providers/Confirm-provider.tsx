'use client';

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
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={onCancel} // Ferme la modale en cliquant sur le fond sombre
          initial={{ opacity: 0 }} // Animation de l'opacité au départ
          animate={{ opacity: 1 }} // Animation vers opacité 1 pour apparaître
          exit={{ opacity: 0 }} // Animation vers opacité 0 pour disparaître
          transition={{ duration: 0.3 }} // Durée de la transition
          key='modal-background' // Clé unique pour AnimatePresence
        >
          <motion.div
            className=' bg-white rounded-lg max-w-2xl min-w-64 w-1/3  p-6 shadow-lg relative'
            onClick={(e) => e.stopPropagation()} // Empêche la propagation du clic
            initial={{ scale: 0.9 }} // Début avec une taille légèrement réduite
            animate={{ scale: 1 }} // Agrandissement à la taille normale
            exit={{ scale: 0.9 }} // Réduction lors de la fermeture
            transition={{ duration: 0.3 }} // Durée de la transition
            key='modal-content' // Clé unique pour AnimatePresence
          >
            <p className='mb-4 text-center font-medium'>{props?.title}</p>
            <div className='flex justify-end space-x-4'>
              <button
                type='button'
                className='px-4 py-2 bg-red-500  rounded hover:bg-red-600 transition'
                onClick={onCancel}
              >
                Annuler
              </button>
              <button
                type='button'
                className='px-4 py-2 bg-blue-600 bg-green-500 hover:bg-green-600 transition  rounded '
                onClick={onConfirm}
              >
                {props?.confirmBtn}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);
  console.log('confirmRef.current:', confirmRef.current); // Debug
  return {
    confirm: useCallback((p: Params) => {
      return confirmRef.current(p);
    }, []),
  };
}
