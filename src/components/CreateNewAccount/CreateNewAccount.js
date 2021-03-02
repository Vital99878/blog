import React, { useRef, useState } from 'react';
import { connect }                 from 'react-redux';
import * as actions from '../../redux/actions';
import classes      from './CreateNewAccount.module.scss';

const { card__title, card, card__forms, card__label, card__button, card__input } = classes;
let { warning, card__inputWarning } = classes;

const CreateNewAccount = ( ) => {
  const [ passwordLength, setPasswordLength ] = useState( 0 );
  const usernameRef = useRef();
  const emailRef = useRef( '' );
  const passwordRef = useRef( '' );
  const repeatPasswordRef = useRef( '' );


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

  function changeLengthPassword() {
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
      <h6 className={card__title}>Create new account</h6>
      <div className={card__forms}>
        <label className={card__label}>
          Username
          <input ref={usernameRef}
                 className={card__input}
                 type='text'
                 placeholder="you name"
          />
        </label>
        <label className={card__label}>
          Email address
          <input ref={emailRef}
                 className={card__input}
                 type='email'
                 placeholder="email"
          />
        </label>
        <label className={card__label}>
          Password
          <input ref={passwordRef}
                 className={card__inputWarning || card__input}
                 minLength='6'
                 type='password'
                 placeholder='password'
                 onChange={changeLengthPassword}
          />
          <span className={warning || classes.hideSpan}>
            Your password needs to be at least 6 characters.
          </span>
        </label>
        <label className={card__label}>
          Repeat Password
          <input ref={repeatPasswordRef}
                 className={card__inputWarning || card__input}
                 type='password'
                 placeholder='Repeat password'
                 onChange={changeLengthPassword}
          />
          <span className={warning || classes.hideSpan}>
            Passwords must match.
          </span>
        </label>
      </div>
      <button className={card__button}
              onClick={() => logIn( [ usernameRef, emailRef, passwordRef, repeatPasswordRef ] )}
              type='submit'>Create
      </button>
    </div>
  );
};
const mapStateToProps = ( state ) => (
  {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
  });

CreateNewAccount.defaultProp = {
  firstName: '',
  lastName: '',
  email: '',
};
CreateNewAccount.propTypes = {

};

export default connect( mapStateToProps, actions )( CreateNewAccount );