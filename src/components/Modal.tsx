import { useState, useEffect, useCallback } from "react";

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  title = "Modal",
  children,
  onClose,
}: ModalProps) {
  const [closing, setClosing] = useState(false);

  console.log("Modal mounted");

  const handleClose = useCallback(() => {
    console.log("Modal handleClose triggered");
    setClosing(true);
    setTimeout(() => {
      console.log("Modal timeout completed, calling onClose");
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      console.log("Modal unmounted (body scroll restored)");
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Escape key pressed, closing modal");
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 ${
        closing ? "animate-backdrop-out" : "animate-backdrop-in"
      }`}
      onMouseDown={handleClose}
    >
      <div
        className={`bg-white rounded p-4 sm:p-6 w-[90%] sm:max-w-lg relative max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 ${
          closing ? "animate-zoom-out" : "animate-zoom"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          aria-label="Close modal"
        >
          ✖
        </button>
        <h2 id="modal-title" className="text-lg font-bold mb-2">
          {title}
        </h2>
        <div id="modal-description">{children}</div>
      </div>
    </div>
  );
}
