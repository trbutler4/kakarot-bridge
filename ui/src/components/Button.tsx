import cn from "classnames";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export const Button = ({ onClick, label, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("p-2 bg-kkrt_orange rounded-xl px-4 w-full", className)}
    >
      {label}
    </button>
  );
};
