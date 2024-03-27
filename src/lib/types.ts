import { ButtonHTMLAttributes } from 'react';

export type PaginationDirection = 'previous' | 'next';
export type AuthActionType = 'login' | 'signup';
export type AccountView = 'profile' | 'settings';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
};
