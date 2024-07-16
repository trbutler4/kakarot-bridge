import cn from "classnames";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  label,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2 text-kkrt_green bg-kkrt_orange rounded-xl px-4 w-full flex justify-center items-center",
        className,
        disabled && "opacity-50",
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
