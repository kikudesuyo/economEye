type Props = {
  label: string;
  style?: string;
  func: () => void;
};

const Button = ({ label, style = "", func }: Props) => {
  return (
    <button
      className={`bg-slate-300 px-4 py-3 rounded-xl text-center ${style}`}
      onClick={func}
    >
      {label}
    </button>
  );
};

export default Button;
