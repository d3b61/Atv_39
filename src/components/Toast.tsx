import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  onViewCart?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, onViewCart }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm bg-white border border-[#DBE4A9] shadow-lg rounded-2xl p-4 flex items-center gap-3 transition-all animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="w-8 h-8 rounded-full bg-[#EAEFC8] flex items-center justify-center text-[#5C674E] shrink-0">
        <Check className="w-4 h-4 text-[#3b4c1e]" />
      </div>

      <div className="flex-1 text-xs text-[#1F2416]">
        <p className="font-medium">{message}</p>
        {onViewCart && (
          <button
            onClick={onViewCart}
            className="text-[11px] font-semibold text-[#5C674E] underline mt-0.5 hover:text-[#1F2416] transition-colors"
          >
            Ver cesta de compras →
          </button>
        )}
      </div>

      <button
        onClick={onClose}
        className="text-[#5C674E] hover:text-[#1F2416] p-1 transition-colors"
        aria-label="Fechar aviso"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
