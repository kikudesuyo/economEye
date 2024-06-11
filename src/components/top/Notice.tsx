const Notice = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">お知らせ</h1>
      <div className="rounded-md border-2 border-gray-300 bg-neutral-100 p-5 shadow-md">
        <ul className="flex list-disc flex-col gap-4 pl-5">
          <li>2024年5月1日 プレリリース</li>
          <li>2024年6月10日 デザインの修正</li>
        </ul>
      </div>
    </div>
  );
};

export default Notice;
