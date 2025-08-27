// app/components/Button.tsx
import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary"
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} ${loading ? 'btn--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="btn__spinner">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
}
