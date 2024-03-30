type Props = {
  children: React.ReactNode;
  style?: string;
};

const Main = ({ children, style = "" }: Props) => {
  return (
    <main className={`flex flex-col flex-1 mx-auto w-4/5 ${style}`}>
      {children}
    </main>
  );
};
export default Main;
