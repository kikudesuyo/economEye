import Main from "@/components/Main";
import graphLogo from "@/assets/imgs/graph_creating.svg";
import Description from "@/pages/item/sample/SampleItemList";

const Home = () => {
  return (
    <Main style="items-center gap-8 pt-4">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-7xl font-bold sm:text-3xl md:text-5xl">
            economEye👀
          </h1>
          <h2 className="text-xl">あなたの生活を豊かに</h2>
          <h2 className="text-xl">商品の買い時がわかります</h2>
        </div>
        <div className="flex flex-col gap-12">
          <div className="container mx-auto p-4">
            <img className="mx-auto md:w-3/5 lg:w-1/2" src={graphLogo} />
          </div>
          <Description />
        </div>
      </div>
    </Main>
  );
};
export default Home;
