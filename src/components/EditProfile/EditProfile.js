import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './EditProfile.module.scss';

const { card__title, card, card__forms, card__label, card__button, card__input } = classes;
const { warning, card__inputWarning } = classes;

const EditProfile = ({ updateUser, responseValidation, user, emailValid, usernameValid }) => {
  const { register, handleSubmit, errors } = useForm();
  const [once, setOnce] = useState(false);

  const onSubmit = async (data) => {
    setOnce(true);
    setTimeout(() => setOnce(false), 2500);
    updateUser(data, user.token);
  };

  return (
    <div className={card}>
      <h6 className={card__title}>Edit Profile</h6>
      <form className={card__forms} onSubmit={handleSubmit(onSubmit)}>
        <label className={card__label}>
          Username
          <input
            ref={register({ required: true })}
            name="username"
            className={(errors.username && card__inputWarning) || card__input}
            type="text"
            defaultValue={user.username}
          />
          {errors.username && errors.username.type === 'required' && (
            <span className={warning}>Username is required</span>
          )}
          <span className={warning}>{usernameValid}</span>
        </label>
        <label className={card__label}>
          Email address
          <input
            ref={register({ required: true })}
            name="email"
            className={(errors.email && card__inputWarning) || card__input}
            type="email"
            defaultValue={user.email}
          />
          {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
          <span className={warning}>{emailValid}</span>
        </label>
        <label className={card__label}>
          New password
          <input
            ref={register({ minLength: 8, maxLength: 40 })}
            name="password"
            className={(errors.password && card__inputWarning) || card__input}
            type="password"
            required
            placeholder="New password"
          />
          {errors.password && errors.password.type === 'minLength' && (
            <span className={warning}>Your password needs to be at least 8 characters.</span>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <span className={warning}>Your password needs to be less than 41 characters.</span>
          )}
        </label>
        <label className={card__label}>
          Avatar image (url)
          <input ref={register()} name="avatar" className={card__input} type="url" required defaultValue={user.image} />
        </label>
      </form>
      <button className={card__button} onClick={handleSubmit(onSubmit)} disabled={once} type="submit">
        Save
      </button>
    </div>
  );
};

EditProfile.defaultProp = {};
EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  responseValidation: PropTypes.string.isRequired,
  emailValid: PropTypes.string.isRequired,
  usernameValid: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  responseValidation: state.authReducer.responseValidation,
  user: state.authReducer.user,
  emailValid: state.authReducer.emailValid,
  usernameValid: state.authReducer.usernameValid,
});

export default connect(mapStateToProps, actions)(EditProfile);
