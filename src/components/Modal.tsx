import { useEffect, useCallback, useState, useId } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({
  title = "Modal",
  children,
  onClose,
}: ModalProps) {
  const [closing, setClosing] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 ${
        closing ? "animate-backdrop-out" : "animate-backdrop-in"
      } dark:bg-opacity-60`}
      onMouseDown={handleClose}
    >
      <div
        className={`bg-white rounded p-4 sm:p-6 w-[90%] sm:max-w-lg relative max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 ${
          closing ? "animate-zoom-out" : "animate-zoom"
        } dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl dark:text-gray-300 dark:hover:text-white"
          aria-label="Close modal"
        >
          ✖
        </button>
        <h2 id={titleId} className="text-lg font-bold mb-2 dark:text-gray-300">
          {title}
        </h2>
        <div id={descriptionId}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
