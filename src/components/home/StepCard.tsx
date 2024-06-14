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

export default StepCard;
