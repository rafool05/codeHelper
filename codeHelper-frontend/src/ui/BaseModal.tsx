import {type ReactNode}  from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  // Ref for modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is on the backdrop, not inside the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-primary-950/70 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-primary-900 rounded-lg shadow-lg  min-w-md p-6 relative">
        <div className="flex justify-between mb-5 gap-6 items-center">
          {title && <h2 className="text-2xl font-bold text-secondary-900">{title}</h2>}
          <button
            onClick={onClose}
            className="text-primary-600 hover:text-secondary-800 transition"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
