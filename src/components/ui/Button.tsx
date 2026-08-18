import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'underline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = BaseButtonProps & {
  to: string;
  href?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonAsExternal = BaseButtonProps & {
  href: string;
  to?: never;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-arch uppercase transition-all duration-300 select-none group whitespace-nowrap';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2.5 space-x-2',
    md: 'text-xs sm:text-sm px-6 py-3.5 space-x-2.5',
    lg: 'text-sm sm:text-base px-8 py-4 space-x-3',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] hover:shadow-lg hover:shadow-[#C5A880]/15 active:scale-[0.99] transition-all duration-300',
    secondary:
      'bg-[#1C1C1C] text-[#F3F3F1] border border-[#2A2A2A] hover:border-[#C5A880]/50 hover:bg-[#262626] active:scale-[0.99] transition-all duration-300',
    outline:
      'bg-transparent text-[#F3F3F1] border border-[#C5A880]/40 hover:border-[#C5A880] hover:bg-[#C5A880]/10 active:scale-[0.99] transition-all duration-300',
    ghost:
      'bg-transparent text-[#F3F3F1] hover:text-[#C5A880] hover:bg-white/5 active:scale-[0.99] transition-colors duration-300',
    underline:
      'bg-transparent text-[#C5A880] hover:text-white p-0 border-b border-[#C5A880] hover:border-white rounded-none tracking-widest-arch text-xs transition-colors duration-300',
  };

  const combinedClass = `${baseStyles} ${size === 'md' && variant === 'underline' ? 'py-1 text-xs' : sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
          {icon}
        </span>
      )}
    </>
  );

  if ('to' in props && props.to) {
    const { to, ...rest } = props as ButtonAsLink;
    return (
      <Link to={to} className={combinedClass} {...rest}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsExternal;
    return (
      <a href={href} className={combinedClass} {...rest}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={combinedClass} {...buttonProps}>
      {content}
    </button>
  );
}
