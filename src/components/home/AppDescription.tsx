import StepCard from "@/components/home/StepCard";
import arrow from "@/assets/imgs/arrow.svg";

const AppDescription = () => {
  return (
    <div className="flex w-full flex-col flex-nowrap justify-center gap-2 md:flex-row md:gap-8">
      <StepCard step={1} title="アカウント作成" description="" />
      <div className="flex items-center justify-center">
        <img
          src={arrow}
          alt=""
          className="size-12 rotate-90 sm:size-24  md:size-32 md:rotate-0"
        />
      </div>
      <StepCard
        step={2}
        title="商品登録"
        description="
         欲しい商品のJANコードを入力しましょう"
      />
      <div className="flex items-center justify-center">
        <img
          src={arrow}
          alt=""
          className="size-12 rotate-90 sm:size-24 md:size-32 md:rotate-0"
        />
      </div>
      <StepCard
        step={3}
        title="商品一覧の確認"
        description="
      登録した商品の価格を確認しましょう"
      />
    </div>
  );
};

export default AppDescription;
