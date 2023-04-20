import Header from '../../components/header/header';
import {AppRoute, CityName, LOCATION_LIST} from '../../const/const';
import {Link} from 'react-router-dom';
import {updateCity} from '../../store/action';
import {useAppDispatch} from '../../hooks/util';
import LoginForm from '../../components/login-form/login-form';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const randCity: CityName = LOCATION_LIST[Math.floor(Math.random() * LOCATION_LIST.length)];

  return (
    <div className="page page--gray page--login">
      <Header isMain={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} title={AppRoute.Main} onClick={() => dispatch(updateCity(randCity))}>
                <span>{randCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
