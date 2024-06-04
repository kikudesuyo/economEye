import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex justify-between border-b border-black bg-white p-3">
      <Link to="/" className="flex flex-col justify-center text-xl font-bold">
        economEye👀
      </Link>
      <div className="flex gap-2">
        <Button
          style="font-bold"
          label="ログイン"
          func={() => {
            navigate(PATHS.LOGIN);
          }}
        />
        <Button
          style="font-bold"
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
