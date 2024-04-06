type Props = {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder: string;
  containerStyle?: string;
  labelStyle?: string;
  type: string;
  value: string;
};

const Input = ({
  handler,
  label,
  placeholder,
  containerStyle = "",
  labelStyle,
  type,
  value,
}: Props) => {
  return (
    <div className={`flex gap-4 ${containerStyle}`}>
      {label && <p className={`${labelStyle}`}>{label}</p>}
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
