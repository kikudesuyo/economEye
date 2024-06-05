type Props = {
  step: number;
  title: string;
  description: string;
};

const StepCard = ({ step, title, description }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-2xl ">
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

const SampleItemList = () => {
  return (
    <div className="container mx-auto p-8 ">
      <div className="flex flex-row gap-8">
        <StepCard step={1} title="アカウントの作成" description="" />
        <StepCard
          step={2}
          title="商品の登録"
          description="
         欲しい商品のJANコードを入力しましょう
          (JANコードは商品のバーコードに記載されている13桁の数字です)"
        />
        <StepCard step={3} title="商品一覧の確認" description="" />
      </div>
    </div>
  );
};

export default SampleItemList;
