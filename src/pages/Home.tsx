import Main from "@/components/Main";
import graphLogo from "@/assets/imgs/graph_creating.svg";

const Home = () => {
  return (
    <Main style="items-center gap-8 pt-4">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold">economEye👀</h1>
          <h2 className="text-xl">あなたの生活を豊かに</h2>
          <h2 className="text-xl">商品の買い時がわかります</h2>
        </div>
        <div className="container mx-auto p-4">
          <img className="mx-auto w-1/2" src={graphLogo} />
        </div>
      </div>
    </Main>
  );
};
export default Home;
