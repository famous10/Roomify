import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, handleSignIn, handleSignOut } = useAuth();

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <svg
              className="logo"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <span className="name">Roomify</span>
          </div>

          <ul className="links">
            <li><a href="#">Product</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Enterprise</a></li>
          </ul>
        </div>

        <div className="actions">
          {user ? (
            <>
              <span className="greeting">👤 {user.username}</span>
              <button className="login" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <button className="login" onClick={handleSignIn}>Sign In</button>
              <button className="cta" onClick={handleSignIn}>Get Started</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
