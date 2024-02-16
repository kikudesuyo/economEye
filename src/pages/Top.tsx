import Container from "../components/Container";

const Top = () => {
  return (
    <>
      <Container
        child={
          <>
            <div className="flex flex-col items-center gap-8 pt-3 flex-1">
              <h1 className="text-3xl">economEye👀</h1>
              <h2 className="text-lg">あなたの生活を豊かに</h2>
              <div>商品の買い時がわかります</div>
            </div>
          </>
        }
      />
    </>
  );
};
export default Top;
