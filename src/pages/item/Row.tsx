type Props = {
  children: React.ReactNode;
  label: string;
};

const Row = ({ children, label }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p>{label}</p>
        {children}
      </div>
    </>
  );
};

export default Row;
