import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './SignIn.module.scss';

const { card__title, card, card__form, card__label, card__button, card__input, card__p } = classes;
const { warning, card__inputWarning } = classes;

const SingIn = ({ signIn, user, responseError }) => {
  const { register, handleSubmit, errors } = useForm();
  const [once, setOnce] = useState(false);

  const onSubmit = async (data) => {
    if (!once) {
      setOnce(true);
      const { email, password } = data;
      signIn(email.toLowerCase(), password);
    }
  };

  if (user) {
    return <Redirect to="/articles" />;
  }

  return (
    <div className={card}>
      <h6 className={card__title}>Sign In</h6>
      <form className={card__form} onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
          {errors.email && errors.email.type === 'pattern' && <span className={warning}>Email not valid</span>}
          {responseError && <span className={warning}>{responseError}</span>}
        </label>
        <label className={card__label}>
          Password
          <input
            ref={register({ required: true, minLength: 8, maxLength: 40 })}
            name="password"
            className={(errors.password && card__inputWarning) || card__input}
            type="password"
            required
            placeholder="Password"
            onChange={() => setOnce(false)}
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
          {responseError && <span className={warning}>{responseError}</span>}
        </label>
        <button className={card__button} onClick={handleSubmit(onSubmit)} type="submit" disabled={once}>
          Login
        </button>
      </form>
      <p className={card__p}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </div>
  );
};

SingIn.defaultProp = {};
SingIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  responseError: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  responseValidation: state.authReducer.responseValidation,
  user: state.authReducer.user,
  responseError: state.authReducer.responseError,
});

export default connect(mapStateToProps, actions)(SingIn);
