import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import Button from "@/components/Button";
import { PATHS } from "@/utils/Paths";
import { removeAuthUserItemData } from "@/data/localStorage/item/authUserItemData";

const Header = () => {
  const { isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex h-16 justify-between border-b-2 border-slate-300 bg-white p-3 shadow-md">
      <Link
        to={isAuthenticated ? PATHS.TOP : PATHS.HOME}
        className="flex flex-col justify-center text-xl font-bold"
      >
        economEye👀
      </Link>

      <div className="flex gap-2">
        {loading ? (
          <></>
        ) : isAuthenticated ? (
          <Button
            label="ログアウト"
            func={async () => {
              await logout();
              removeAuthUserItemData();
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
