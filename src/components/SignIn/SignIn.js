import React  from 'react';
import { Link, Redirect }                    from 'react-router-dom';
import PropTypes                   from 'prop-types';
import { connect }                 from 'react-redux';
import { useForm }                 from 'react-hook-form';
import * as actions                from '../../redux/actions';
import classes                     from './SignIn.module.scss';


const { card__title, card, card__forms, card__label, card__button, card__input, card__p } = classes;
const { warning, card__inputWarning } = classes;

const SingIn = ( { signIn, responseValidation, auth } ) => {
  const { register, handleSubmit, errors } = useForm();
  
  const onSubmit = async ( data ) => {
    const {email, password} = data;
    signIn (email.toLowerCase(), password)
  };

  if (auth ) {
    return <Redirect to='/'/>
  }

    return (
    <div className={card}>
      <h6 className={card__title}>Sign In</h6>
      <form className={card__forms} onSubmit={handleSubmit( onSubmit )}>
        <label className={card__label}>
          Email address
          <input
            ref={register( { required: true } )}
            name="email"
            className={errors.email && card__inputWarning || card__input}
            type="email"
            required
            placeholder="Email address" />
          {errors.email && errors.email.type === 'required' && <span className={warning}>Email is required</span>}
          {responseValidation && <span className={warning}>{responseValidation}</span>}
        </label>
        <label className={card__label}>
          Password
          <input
            ref={register( { required: true, minLength: 8, maxLength: 40 } )}
            name="password"
            className={errors.password && card__inputWarning || card__input}
            type="password"
            required
            placeholder="Password"
          />
          {errors.password && errors.password.type === 'minLength' &&
          <span className={warning}>Your password needs to be at least 8 characters.</span>}
          {errors.password && errors.password.type === 'maxLength' &&
          <span className={warning}>Your password needs to be less than 41 characters.</span>}
          {errors.password && errors.password.type === 'required' &&
          <span className={warning}>Password is required.</span>}
          {responseValidation && <span className={warning}>{responseValidation}</span>}
        </label>
      </form>
      <button className={card__button} onClick={handleSubmit( onSubmit )} type="submit">
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
  auth: PropTypes.objectOf.isRequired
};

const mapStateToProps = ( state ) => (
  {
    responseValidation: state.responseValidation,
    auth: state.auth
  });

export default connect( mapStateToProps, actions )( SingIn );
