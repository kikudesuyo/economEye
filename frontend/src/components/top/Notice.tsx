const Notice = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">お知らせ</h1>
      <div className="rounded-sm border-2 border-gray-300 p-5 shadow-md">
        <ul className="flex list-disc flex-col gap-4 pl-5">
          {/* <li>2024年5月1日 プレリリース</li> */}
          <li>2024年6月10日 デザインが良くなりました</li>
          <li>2024年7月11日 ローディング時間が短くなりました</li>
        </ul>
      </div>
    </div>
  );
};

export default Notice;
