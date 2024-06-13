import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex justify-between border-b border-gray-700 bg-white p-3 shadow-md">
      <Link
        to={isAuthenticated ? PATHS.TOP : PATHS.HOME}
        className="flex flex-col justify-center text-xl font-bold"
      >
        economEye👀
      </Link>
      <div className="flex gap-2">
        {isAuthenticated ? (
          <Button
            label="ログアウト"
            func={() => {
              logout();
              navigate(PATHS.HOME);
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
