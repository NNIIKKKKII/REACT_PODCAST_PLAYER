import { useContext } from "react";
import { UserContext } from "../Context/userContext.js";

const Header = () => {
  const { user, setUser, loggedIn, setloggedIn, signinButton } =
    useContext(UserContext);

  const handleLogOut = () => {
    setloggedIn(false);
    setUser({});
  };

  return (
    <header className="flex flex-col items-center pt-8 pb-6 px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl text-center text-amber-400 lobster-two-bold drop-shadow-lg select-none">
        React Podcast Player
      </h1>

      <div className="mt-8 flex flex-col items-center gap-4">
        {loggedIn ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-stone-900/80 backdrop-blur-sm border border-amber-500/30 px-6 py-4 shadow-xl">
              <p className="text-stone-300 text-sm font-medium">
                Logged in as <span className="text-amber-400 font-bold">{user.given_name}</span>
              </p>
              <button
                className="rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-semibold px-4 py-2 text-sm transition-colors shadow-md"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <div
            ref={signinButton}
            className="rounded-xl overflow-hidden shadow-lg [&>div]:!rounded-xl"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
