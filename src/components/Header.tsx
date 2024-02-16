const Header = () => {
  return (
    <header className="flex justify-between p-3 bg-neutral-300">
      <p>economEye👀</p>
      <div className="flex gap-2">
        <button>ログイン</button>
        <button>新規登録</button>
      </div>
    </header>
  );
};
export default Header;
