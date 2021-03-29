import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './SignUp.module.scss';
import { validateEmail } from '../../utilities';

const { card__title, card, card__forms, card__label, card__button, card__input, card__p, card__formInput } = classes;
const { warning, card__inputWarning } = classes;

const SingUp = ({ user, signUp, usernameValidation, responseValidation, emailValid, usernameValid }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [once, setOnce] = useState(false);
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    setOnce(true);
    signUp(data);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={card}>
      <h6 className={card__title}>Create new account</h6>
      <form className={card__forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={card__formInput}>
          <label className={card__label}>
            Username
            <input
              onChange={() => setOnce(false)}
              ref={register({ required: true })}
              name="username"
              className={(errors.username && card__inputWarning) || card__input}
              type="text"
              required
              placeholder="name"
            />
            {<span className={warning}>{usernameValid}</span>}
            {errors.username && errors.username.type === 'required' && (
              <span className={warning}>Username is required</span>
            )}
            {usernameValidation && <span className={warning}>{usernameValid}</span>}
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            Email address
            <input
              onChange={() => setOnce(false)}
              ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
              name="email"
              className={(errors.email && card__inputWarning) || card__input}
              type="email"
              required
              placeholder="Email address"
            />
            {<span className={warning}>{emailValid}</span>}
            {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
            {errors.email && errors.email.type === 'pattern' && <span className={warning}>Email not valid</span>}
            {responseValidation && <span className={warning}>{responseValidation}</span>}
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            Password
            <input
              ref={register({ required: true, minLength: 8, maxLength: 40 })}
              name="password"
              className={(errors.password && card__inputWarning) || card__input}
              type="password"
              required
              placeholder="Password"
            />
            {errors.password && errors.password.type === 'minLength' && (
              <span className={warning}>Your password needs to be at least 8 characters.</span>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <span className={warning}>Your password needs to be less than 41 characters.</span>
            )}
            {errors.password && errors.password.type === 'required' && (
              <span className={warning}>Password is required.</span>
            )}
            {responseValidation && <span className={warning}>{responseValidation}</span>}
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            Repeat Password
            <input
              ref={register({ validate: (value) => value === password.current || 'The passwords do not match' })}
              name="password_repeat"
              className={(errors.password && card__inputWarning) || card__input}
              type="password"
              placeholder="Repeat Password"
            />
            {errors.password_repeat && <span className={warning}>The password does not match</span>}
            {errors.password_repeat && errors.password_repeat.type === 'required' && (
              <span className={warning}>Password is required.</span>
            )}
            {responseValidation && <span className={warning}>{responseValidation}</span>}
          </label>
        </div>
        <div className={card__formInput}>
          <label className={classes.card__checkbox}>
            <input ref={register({ required: 'This is required' })} name="agree" type="checkbox" />
            <span className={classes.checkmark} />I agree to the processing of my personal information
          </label>
          {errors.agree && errors.agree.type === 'required' && <span className={warning}>You need check agree</span>}
        </div>
        <button className={card__button} onClick={handleSubmit(onSubmit)} disabled={once} type="submit">
          Login
        </button>
      </form>
      <p className={card__p}>
        Don’t have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
};

SingUp.defaultProp = {};
SingUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  usernameValidation: PropTypes.string.isRequired,
  responseValidation: PropTypes.string.isRequired,
  emailValid: PropTypes.string.isRequired,
  usernameValid: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  responseValidation: state.authReducer.responseValidation,
  emailValid: state.authReducer.emailValid,
  usernameValid: state.authReducer.usernameValid,
});

export default connect(mapStateToProps, actions)(SingUp);
