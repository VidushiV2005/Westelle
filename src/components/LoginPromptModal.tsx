import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-neutral-200 bg-white p-8"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <svg className="h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl tracking-wide">Sign In Required</h3>
            <p className="mt-3 text-sm text-neutral-600">
              Please sign in to your account to add items to your cart and continue shopping.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="flex-1 bg-black py-3 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-neutral-800"
              >
                SIGN IN
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-neutral-300 py-3 text-xs tracking-[0.3em] text-neutral-700 transition-all duration-300 hover:border-black"
              >
                CANCEL
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}