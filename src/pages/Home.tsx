import Main from "@/components/Main";
import graphLogo from "@/assets/imgs/graph_creating.svg";
import AppDescription from "@/components/home/AppDescription";

const Home = () => {
  return (
    <Main style="items-center gap-8 pt-4">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold sm:text-5xl  md:text-6xl">
            economEye👀
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl">
            あなたの生活を豊かに
          </h2>
          <h2 className="text-lg sm:text-xl md:text-2xl">
            商品の買い時がわかります
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <div className="container mx-auto p-4">
            <img className="mx-auto w-4/6 md:w-3/5" src={graphLogo} />
          </div>
          <AppDescription />
        </div>
      </div>
    </Main>
  );
};
export default Home;
