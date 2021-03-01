import React, { useRef, useState } from 'react';
import { connect }                 from 'react-redux';
import PropTypes                   from 'prop-types';
import * as actions                from '../../redux/actions';
import classes                     from './EditProfile.module.scss';


const { card__title, card, card__forms, card__label, card__button, card__input } = classes;
let { warning, card__inputWarning } = classes;

const EditProfile = ( { firstName, lastName, email } ) => {
  const [ passwordLength, setPasswordLength ] = useState( 0 );
  const usernameRef = useRef();
  const emailRef = useRef( '' );
  const newPasswordRef = useRef( '' );
  const avatarUrlRef = useRef();

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
    setPasswordLength( () => newPasswordRef.current.value.length );
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
      <h6 className={card__title}>Edit Profile</h6>
      <div className={card__forms}>
        <label className={card__label}>
          Username
          <input ref={usernameRef}
                 className={card__input}
                 type='text'
                 defaultValue={`${firstName} ${lastName}`}
          />
        </label>
        <label className={card__label}>
          Email address
          <input ref={emailRef}
                 className={card__input}
                 type='email'
                 defaultValue={email}
          />
        </label>
        <label className={card__label}>
          New password
          <input ref={newPasswordRef}
                 className={card__inputWarning || card__input}
                 minLength='6'
                 type='password'
                 placeholder='New password'
                 onChange={changeLengthPassword}
          />
          <span className={warning || classes.hideSpan}>
            Your password needs to be at least 6 characters.
          </span>
        </label>
        <label className={card__label}>
          Avatar image (url)
          <input ref={avatarUrlRef}
                 className={card__input}
                 type='url'
                 placeholder='Avatar image' />
        </label>
      </div>
      <button className={card__button}
              onClick={() => logIn( [ usernameRef, emailRef, newPasswordRef, avatarUrlRef ] )}
              type='submit'>Save
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

EditProfile.defaultProp = {
  firstName: '',
  lastName: '',
  email: '',
};
EditProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect( mapStateToProps, actions )( EditProfile );