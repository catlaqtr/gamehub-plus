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

  console.log("ModalTrigger rendered. open:", open);

  const childWithProps = isValidElement(children)
    ? cloneElement(children, {
        onClick: () => {
          console.log("ModalTrigger button clicked, opening modal");
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
            console.log("Modal onClose called, closing modal");
            setOpen(false);
          }}
        >
          {modalContent}
        </Modal>
      )}
    </>
  );
}
