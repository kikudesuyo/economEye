type Props = {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  style?: string;
  type: string;
  value: string;
};

const Input = ({
  handler,
  label,
  placeholder,
  style = "",
  type,
  value,
}: Props) => {
  return (
    <div className={`flex flex-col gap-4 ${style}`}>
      <p>{label}</p>
      <input
        className="border-b-2 border-slate-300 outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handler(e)}
      />
    </div>
  );
};

export default Input;
