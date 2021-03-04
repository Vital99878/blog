import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes    from 'prop-types';
import {Link}       from 'react-router-dom';
import * as actions from '../../redux/actions';
import classes      from './Auth_hoc.module.scss';
import User         from '../User';

const {list, item, signIn, signUp, logOut, createArticle} = classes;

const Auth_hoc = ( { auth, user, isLogOut }) => {

  if (auth ) {
    return (
      <ul className={list}>
        <li className={`${item} ${createArticle}`}><Link to='/createArticle'>Create article</Link></li>
        <li className={item}><Link to='/editProfile'><User user={user}/></Link></li>
        <li className={`${item} ${logOut}`}><Link  onClick={isLogOut} to='/'>Log Out</Link></li>
      </ul>
    )
  }
  return (
    <ul className={list}>
      <li className={`${item} ${signIn}`}><Link to="/signIn">Sign In</Link></li>
      <li className={`${item} ${signUp}`}><Link to='signUp'>Sign Up</Link></li>
    </ul>
  )
}

Auth_hoc.defaultProp = {

};
Auth_hoc.propTypes = {
  user: PropTypes.objectOf.isRequired,
  auth: PropTypes.bool.isRequired,
  isLogOut:  PropTypes.func.isRequired};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, actions)(Auth_hoc);
