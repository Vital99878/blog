import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './EditProfile.module.scss';

const { card__title, card, card__forms, card__label, card__button, card__input } = classes;
const { warning, card__inputWarning, card__formInput, card__button__disabled } = classes;

const EditProfile = ({ updateUser, user, emailValid, usernameValid }) => {
  const { register, handleSubmit, errors } = useForm();
  const [once, setOnce] = useState(false);
  const [buttonClass, setButtonClass] = useState(card__button);

  useEffect(() => {
    setButtonClass(once ? card__button__disabled : card__button);
  }, [once]);

  const onSubmit = async (data) => {
    if (!once) {
      setOnce(true);
      await updateUser(data, user.token);
      setOnce(false);
    }
  };

  if (!user) return <Redirect to="/sign-in" />;

  return (
    <div className={card}>
      <h6 className={card__title}>Edit Profile</h6>
      <form className={card__forms} onSubmit={handleSubmit(onSubmit)}>
        <div className={card__formInput}>
          <label className={card__label}>
            Username
            <input
              ref={register({
                required: true,
              })}
              name="username"
              className={(errors.username && card__inputWarning) || card__input}
              type="text"
              defaultValue={user.username}
              onChange={() => setOnce(false)}
            />
            {errors.username && errors.username.type === 'required' && (
              <span className={warning}>Username is required</span>
            )}
            <span className={warning}>{usernameValid}</span>
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            Email address
            <input
              ref={register({
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              name="email"
              className={(errors.email && card__inputWarning) || card__input}
              type="email"
              defaultValue={user.email}
              onChange={() => setOnce(false)}
            />
            {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
            {errors.email && errors.email.type === 'pattern' && <span className={warning}>Email is invalid</span>}
            <span className={warning}>{emailValid}</span>
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            New password
            <input
              ref={register({
                minLength: 8,
                maxLength: 40,
              })}
              name="password"
              className={(errors.password && card__inputWarning) || card__input}
              type="password"
              required
              placeholder="New password"
              onChange={() => setOnce(false)}
            />
            {errors.password && errors.password.type === 'minLength' && (
              <span className={warning}>Your password needs to be at least 8 characters.</span>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <span className={warning}>Your password needs to be less than 41 characters.</span>
            )}
          </label>
        </div>
        <div className={card__formInput}>
          <label className={card__label}>
            Avatar image (url)
            <input
              ref={register({
                required: false,
                pattern: /^(https:|http:|www\.)\S*/,
              })}
              name="avatar"
              className={card__input}
              type="url"
              required
              defaultValue={user.image || ''}
              onChange={() => setOnce(false)}
            />
            {errors.avatar && errors.avatar.required && <span className={warning}>URL is required</span>}
            {errors.avatar && <span className={warning}>URL is invalid</span>}
          </label>
        </div>
        <button className={buttonClass} onClick={handleSubmit(onSubmit)} disabled={once} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

EditProfile.defaultProp = {};
EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
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
