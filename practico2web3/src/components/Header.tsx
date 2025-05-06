const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">Mi Aplicación</a>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
