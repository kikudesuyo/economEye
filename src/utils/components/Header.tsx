import { Link, useNavigate } from "react-router-dom";
import Button from "@/utils/components/Button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between p-3 border-b border-black">
      <Link to="/" className="flex flex-col justify-center text-xl">
        economEye👀
      </Link>
      <div className="flex gap-2">
        <Button
          label="ログイン"
          func={() => {
            navigate("login");
          }}
        />
        <Button
          label="新規登録"
          func={() => {
            navigate("signup");
          }}
        />
      </div>
    </header>
  );
};

export default Header;
