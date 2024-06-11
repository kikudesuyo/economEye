import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex justify-between border-b border-gray-700 bg-white p-3 shadow-md">
      <Link to="/" className="flex flex-col justify-center text-xl font-bold">
        economEye👀
      </Link>
      <div className="flex gap-2">
        <Button
          label="ログイン"
          func={() => {
            navigate(PATHS.LOGIN);
          }}
        />
        <Button
          label="新規登録"
          func={() => {
            navigate(PATHS.SIGNUP);
          }}
        />
      </div>
    </header>
  );
};

export default Header;
