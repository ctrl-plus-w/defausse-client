import { createPortal } from 'react-dom';

import type { MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  children?: ReactNode;

  className?: string;
}

const Modal = ({ open, setOpen, children, className }: IProps) => {
  if (!open) return <></>;

  const onClick = () => setOpen(false);

  const onClickModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className='z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75' onClick={onClick}>
      <div
        className={clsx(['absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded p-14', className])}
        onClick={onClickModal}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
