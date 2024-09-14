import "./header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header5">
      <header className="header">
        <div className="left-section">
          {/* Use Link to navigate to the home page */}
          <Link to="/">
            <button className="header-button">Home</button>
          </Link>

          {/* Use Link to navigate to the history page */}
          <Link to="/history">
            <button className="header-button">History</button>
          </Link>
        </div>
        <button className="header-button2">Logout</button>
      </header>
    </div>
  );
}

export default Header;
