import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  isOpen?: boolean; // Prop opcional para compatibilidad con versiones anteriores
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  isOpen = true,
}) => {
  // Bloquear scroll cuando el modal está abierto (solo si isOpen es false)
  useEffect(() => {
    if (isOpen === false) {
      document.body.style.overflow = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Si isOpen es false, no renderizar nada (para compatibilidad con versiones que no usan isOpen)
  if (isOpen === false) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white p-6 rounded-lg w-96"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
