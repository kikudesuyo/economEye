type Props = {
  label: string;
  className?: string;
  func?: () => void;
};

const Button = ({ label, className, func }: Props) => {
  return (
    <button
      className={`bg-slate-300 px-4 py-3 rounded-xl text-center ${className}`}
      onClick={func}
    >
      {label}
    </button>
  );
};

export default Button;
