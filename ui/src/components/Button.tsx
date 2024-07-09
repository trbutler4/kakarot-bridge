interface ButtonProps {
  onClick: () => void;
  label: string;
}

export const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 bg-kkrt_orange rounded-xl px-4 w-full"
    >
      {label}
    </button>
  );
};
