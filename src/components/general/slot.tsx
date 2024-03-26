import { Children, HTMLAttributes, cloneElement, isValidElement } from 'react';

type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export default function Slot({ children, ...props }: SlotProps) {
  if (isValidElement(children) && Children.count(children) === 1) {
    return cloneElement(children, { ...props, ...children.props });
  }

  return null;
}
