import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';

type HeaderProps = {
  isAuth: boolean;
  isMain: boolean;
}

const getNavigationElement = (): JSX.Element => (
  <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        </div>
      </li>
      <li className="header__nav-item">
        <Link to={AppRoute.Login} title={AppRoute.Login}>
          <span className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

const Header = ({isAuth, isMain}: HeaderProps): JSX.Element => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={AppRoute.Main} title={AppRoute.Main}>
            <span className={isMain ? 'header__logo-link header__logo-link--active' : 'header__logo-link'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </span>
          </Link>
        </div>
        {isAuth ? getNavigationElement() : ''}
      </div>
    </div>
  </header>
);

export default Header;
