type Props = {
  label: string;
};

export const Button = ({ label }: Props) => {
  return <button className="bg-slate-300 px-4 py-3 rounded-xl">{label}</button>;
};
