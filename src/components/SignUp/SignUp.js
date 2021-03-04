import React, { useRef, useState } from 'react';
import { connect }                 from 'react-redux';
import { Link }                    from 'react-router-dom';
import * as actions from '../../redux/actions';
import classes      from './SignUp.module.scss';

const { card__title, card, card__forms, card__label, card__button, card__input, card__p } = classes;
let { warning, card__inputWarning } = classes;

const SignUp = ( ) => {
  const [ passwordLength, setPasswordLength ] = useState( 0 );
  const [ repeatPasswordWarning, setRepeatPasswordWarning ] = useState( false );
  const [ warningMatchPassword, setWarningMatchPassword ] = useState( false );
  // const [ repeatPasswordWarning, setRepeatPasswordWarning ] = useState( false );
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

  function comparePassword () {
    if(passwordRef.current.value === repeatPasswordRef.current.value) {
      setRepeatPasswordWarning(false)
      setWarningMatchPassword(false)
    }
    else {
      setRepeatPasswordWarning(() => classes.card__passwordRepeatWarning)
      setWarningMatchPassword(() => classes.warningMatchPassword)
    }
  }

  function changeLengthPassword() {
    setPasswordLength( () => passwordRef.current.value.length );
  }

  function toggleSuccessClass( evt ) {
    if ( evt.target.value.length > 0 ){
      evt.target.classList.replace( classes.card__inputWarning, card__input  );
    }
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
                 minLength='3'
                 maxLength="20"
                 onChange={toggleSuccessClass}
          />
        </label>
        <label className={card__label}>
          Email address
          <input ref={emailRef}
                 className={card__input}
                 type='email'
                 placeholder="email"
                 onChange={toggleSuccessClass}
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
                 className={repeatPasswordWarning || card__input}
                 type='password'
                 placeholder='Repeat password'
                 onChange={comparePassword}
          />
          <span className={warningMatchPassword || classes.hideSpan}>
            Passwords must match.
          </span>
        </label>
      </div>
      <label className={classes.card__checkbox}>
        <input type="checkbox"/>
        <span className={classes.checkmark} />
        I agree to the processing of my personal
        information
      </label>
      <button className={card__button}
              onClick={() => logIn( [ usernameRef, emailRef, passwordRef, repeatPasswordRef ] )}
              type='submit'>Create
      </button>
      <p className={card__p}>Don’t have an account? <Link to='/signIn'>Sign In.</Link></p>
    </div>
  );
};

const mapStateToProps = ( state ) => (
  {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
  });

SignUp.defaultProp = {
  firstName: '',
  lastName: '',
  email: '',
};
SignUp.propTypes = {

};

export default connect( mapStateToProps, actions )( SignUp );