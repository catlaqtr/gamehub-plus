import { useState, cloneElement, ReactElement, isValidElement } from "react";
import Modal from "./Modal";

type ModalTriggerProps = {
  children: ReactElement<{ onClick?: () => void }>;
  modalContent: React.ReactNode;
};

export default function ModalTrigger({
  children,
  modalContent,
}: ModalTriggerProps) {
  const [open, setOpen] = useState(false);

  const childWithProps = isValidElement(children)
    ? cloneElement(children, {
        onClick: () => {
          setOpen(true);
        },
      })
    : children;

  return (
    <>
      {childWithProps}
      {open && (
        <Modal
          onClose={() => {
            setOpen(false);
          }}
        >
          {modalContent}
        </Modal>
      )}
    </>
  );
}
