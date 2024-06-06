import arrow from "@/assets/imgs/arrow.svg";

type Props = {
  step: number;
  title: string;
  description: string;
};

const StepCard = ({ step, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full rounded-lg bg-white p-4 shadow-xl md:w-auto">
        <div className="mb-4 flex items-center">
          <h2 className="text-lg font-bold">
            Step {step}: {title}
          </h2>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Description = () => {
  return (
    <div className="container mx-auto p-8 ">
      <div className="flex flex-row justify-center gap-8">
        <StepCard step={1} title="アカウント作成" description="" />
        <div className="flex w-1/2 items-center">
          <img src={arrow} alt="" />
        </div>
        <StepCard
          step={2}
          title="商品の登録"
          description="
         欲しい商品のJANコードを入力しましょう
          (JANコードは商品のバーコードに記載されている13桁の数字です)"
        />
        <div className="flex w-1/2 items-center">
          <img src={arrow} alt="" />
        </div>
        <StepCard step={3} title="商品一覧の確認" description="" />
      </div>
    </div>
  );
};

export default Description;
