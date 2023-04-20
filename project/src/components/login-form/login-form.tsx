import React, {FormEvent, useRef} from 'react';
import {AuthData} from '../../types/types';
import {store} from '../../store';
import {loginAction} from '../../store/api-action';
import {ErrorMessage, PASSWORD_REGEX} from '../../const/const';

const LoginForm = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    store.dispatch(loginAction(authData));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (PASSWORD_REGEX.test(passwordRef.current.value)) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        passwordRef.current.setCustomValidity(ErrorMessage.InvalidPassword);
        passwordRef.current.reportValidity();
      }
    }
  };

  const handlePasswordChange = (): void => {
    if (passwordRef.current !== null) {
      passwordRef.current.setCustomValidity('');
    }
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} onInput={handlePasswordChange} required/>
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
};

export default LoginForm;
