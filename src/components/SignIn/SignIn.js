import React, { useRef, useState } from 'react';
import { Link }                    from 'react-router-dom';
import PropTypes                   from 'prop-types';
import { connect }                 from 'react-redux';
import * as actions                from '../../redux/actions';
import classes                     from './SignIn.module.scss';


const { card__title, card, card__forms, card__label, card__button, card__input, card__p } = classes;
let { warning, card__inputWarning } = classes;

const SingIn = ( { signIn } ) => {

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

    const [ mail, password ] = refs;
    if ( mail.current.value.length !== 0 && password.current.value.length >= 8 ) {
      signIn( mail.current.value, password.current.value );
    }
  }

  function toggleSuccessClass( evt ) {
    if ( evt.target.value.length > 0 ) {
      evt.target.classList.replace( classes.card__inputWarning, card__input );
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
      <h6 className={card__title}>Sign In</h6>
      <div className={card__forms}>
        <label className={card__label}>Email address
          <input ref={mailRef}
                 className={card__input}
                 type='email'
                 required
                 placeholder='Email address'
                 onChange={toggleSuccessClass} />
        </label>
        <label className={card__label}>Password
          <input ref={passwordRef}
                 className={card__inputWarning || card__input}
                 minLength='8'
                 maxLength="40"
                 type='password'
                 required
                 placeholder='Password'
                 onChange={ () => setPasswordLength( () => passwordRef.current.value.length )} />
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
SingIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};
// const mapStateToProps = (state) ={
//
// }

export default connect( null, actions )( SingIn );