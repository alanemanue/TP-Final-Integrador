import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div onClick={onClose} />
      <div>
        {children}
      </div>
    </div>
  );
}


