type HeaderProps = {
  isAuth: boolean;
  isMain: boolean;
}

const navigation: JSX.Element = (
  <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        </div>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  </nav>
);

const Header = ({isAuth, isMain}: HeaderProps): JSX.Element => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className={isMain ? 'header__logo-link header__logo-link--active' : 'header__logo-link'} href={isMain ? '#' : 'main.html'}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </a>
        </div>
        {isAuth ? navigation : ''}
      </div>
    </div>
  </header>
);

export default Header;
