import {type ReactNode}  from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary-950/70 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-primary-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <div className="flex justify-between mb-5">
          {title && <h2 className="text-2xl font-bold text-secondary-900">{title}</h2>}
          <button
            onClick={onClose}
            className="text-primary-600 hover:text-secondary-800 "
            >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
