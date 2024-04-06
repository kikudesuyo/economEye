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
    <div className={`flex gap-4 ${style}`}>
      <p>{label}</p>
      <input
        className="flex-auto border-b-2 border-stone-300 outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handler(e)}
      />
    </div>
  );
};

export default Input;
