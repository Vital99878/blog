import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './SignIn.module.scss';
import { validateEmail } from '../../utilities';

const { card__title, card, card__forms, card__label, card__button, card__input, card__p } = classes;
const { warning, card__inputWarning } = classes;

const SingIn = ({ signIn, responseValidation, user }) => {
  const { register, handleSubmit, errors } = useForm();
  const [once, setOnce] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onSubmit = async (data) => {
    setOnce(true);
    setTimeout(() => setOnce(false), 2500);
    const { email, password } = data;
    if (validateEmail(email)) {
      signIn(email.toLowerCase(), password);
      setInvalid(false)
    } else {
      setInvalid(true);
    }
  };

  if (user) {
    return <Redirect to="/articles" />;
  }

  return (
    <div className={card}>
      <h6 className={card__title}>Sign In</h6>
      <form className={card__forms} onSubmit={handleSubmit(onSubmit)}>
        <label className={card__label}>
          Email address
          <input
            ref={register({ required: true })}
            name="email"
            className={(errors.email && card__inputWarning) || card__input}
            type="email"
            required
            placeholder="Email address"
          />
          {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
          {responseValidation && <span className={warning}>{responseValidation}</span>}
          {invalid && <span className={warning}>Email not valid</span>}
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
      </form>
      <button className={card__button} onClick={handleSubmit(onSubmit)} type="submit" disabled={once}>
        Login
      </button>
      <p className={card__p}>
        Don’t have an account? <Link to="/signUp">Sign Up.</Link>
      </p>
    </div>
  );
};

SingIn.defaultProp = {};
SingIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  responseValidation: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  responseValidation: state.authReducer.responseValidation,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, actions)(SingIn);
