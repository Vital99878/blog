import React, { useRef, useState } from 'react';
import { Link }                    from 'react-router-dom';
import classes                     from './SignIn.module.scss';
// import PropTypes from 'prop-types';

const { card__title, card, card__forms, card__label, card__button, card__input, card__p } = classes;
let { warning, card__inputWarning } = classes;

const SingIn = () => {
  const [ passwordLength, setPasswordLength ] = useState( 0 );
  const mailRef = useRef( '' );
  const passwordRef = useRef( '' );

  function logIn( refs ) {
    const refForFocus = refs.find( ref => ref.current.value.length === 0 );
    if ( refForFocus ) {
      refForFocus.current.focus();
    }
    refs.forEach( ( ref ) => {
      if ( ref.current.value.length === 0 ) {
        ref.current.classList.replace( card__input, classes.card__inputWarning );
        ref.current.placeholder = 'not empty!';
      }
      else {
        ref.current.classList.replace( classes.card__inputWarning, card__input );
      }
    } );
  }

  function toggleSuccessClass( evt ) {
    if ( evt.target.value.length > 0 ){
      evt.target.classList.replace( classes.card__inputWarning, card__input  );
    }
  }

  function changeLength() {
    setPasswordLength( () => passwordRef.current.value.length );
  }

  if ( passwordLength >= 6 || passwordLength === 0 ) {
    card__inputWarning = false;
    warning = false;
  }
  else {
    warning = classes.warning;
    card__inputWarning = classes.card__inputWarning;
  }

  return (
    <div className={card}>
      <h6 className={card__title}>Sign In</h6>
      <div className={card__forms}>
        <label className={card__label}>Email address
          <input ref={mailRef} className={card__input} type='email' placeholder='Email address'
                 onChange={toggleSuccessClass} />
        </label>
        <label className={card__label}>Password
          <input ref={passwordRef}
                 className={card__inputWarning || card__input}
                 minLength='6'
                 type='password'
                 placeholder='Password'
                 onChange={changeLength} />
          <span className={warning || classes.hideSpan}>
            Your password needs to be at least 6 characters.
          </span>
        </label>
      </div>
      <button onClick={() => logIn( [ mailRef, passwordRef ] )} className={card__button} type='submit'>Login</button>
      <p className={card__p}>Don’t have an account? <Link to='/signUp'>Sign Up.</Link></p>
    </div>
  );
};

SingIn.defaultProp = {};
SingIn.propTypes = {};
export default SingIn;