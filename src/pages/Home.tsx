import Main from "@/components/Main";
import graphLogo from "@/assets/imgs/graph_creating.svg";

const Home = () => {
  return (
    <Main style="items-center gap-8 pt-4">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">economEye👀</h1>
          <h2 className="text-sm">あなたの生活を豊かに</h2>
          <h2 className="text-sm">商品の買い時がわかります</h2>
        </div>
        <div className="container mx-auto p-4">
          <img
            className="mx-auto w-full sm:w-1/2 lg:w-1/4 xl:w-1/5"
            src={graphLogo}
          />
        </div>
      </div>
    </Main>
  );
};
export default Home;
