type Props = {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
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
      {label && <p className="font-bold">{label}</p>}
      <input
        className="w-full flex-auto appearance-none rounded border-b-2 border-stone-300 px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:shadow-md focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handler(e)}
      />
    </div>
  );
};

export default Input;
