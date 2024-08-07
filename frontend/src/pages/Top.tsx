import { useNavigate } from "react-router-dom";

import Recommendation from "@/components/top/Recommendation";
import Main from "@/components/Main";
import Notice from "@/components/top/Notice";
import Button from "@/components/Button";
import { PATHS } from "@/utils/Paths";

const Top = () => {
  const navigate = useNavigate();
  return (
    <Main style="mt-4">
      <div className="flex flex-col gap-6">
        <Recommendation />
        <Notice />
        <div className="mt-14 flex flex-col gap-6 md:gap-12">
          <Button
            label="商品登録ページ"
            style="w-3/5 mx-auto md:w-2/5 md:p-5 md:text-xl"
            func={() => {
              navigate(PATHS.REGISTER_ITEM);
            }}
          />
          <Button
            label="商品一覧ページ"
            style="w-3/5 mx-auto md:w-2/5 md:p-5 md:text-xl"
            func={() => {
              navigate(PATHS.ITEM_LIST);
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default Top;
