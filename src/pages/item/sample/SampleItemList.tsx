import arrow from "@/assets/imgs/arrow.svg";

type Props = {
  step: number;
  title: string;
  description: string;
};

const StepCard = ({ step, title, description }: Props) => {
  return (
    <div className="flex w-full flex-col items-center md:w-1/3 ">
      <div className="size-full rounded-lg bg-white p-4 shadow-xl">
        <div className="my-4 flex items-center">
          <h2 className="text-2xl font-bold">
            Step {step}: {title}
          </h2>
        </div>
        <p className="text-sm font-bold text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Description = () => {
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

export default Description;
