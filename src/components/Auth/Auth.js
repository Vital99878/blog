import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes    from 'prop-types';
import {Link}       from 'react-router-dom';
import Cookies from 'js-cookie'
import * as actions from '../../redux/actions';
import classes      from './Auth.module.scss';
import User         from '../User';

const {list, item, signIn, signUp, logOut, createArticle} = classes;

const Auth = ( { user, isLogOut, getArticles, update_user_from_cookies }) => {

  if (!user && Cookies.get('username') ) {
    update_user_from_cookies()
  }

  if (user) {
    Cookies.set( 'email', user.email )
    Cookies.set( 'token', user.token )
    Cookies.set( 'image', user.image )
    Cookies.set( 'username', user.username )
    Cookies.set( 'createdAt', user.createdAt )
    Cookies.set( 'updatedAt', user.updatedAt )
  }

  if (user ) {
    return (
      <ul className={list}>
        <li className={`${item} ${createArticle}`}><Link to='/new-article'>Create article</Link></li>
        <li className={item}><Link to='/profile'><User user={user}/></Link></li>
        <li className={`${item} ${logOut}`}><Link  onClick={() => {
          isLogOut()
          getArticles(5)
        }} to='/articles'>Log Out</Link></li>
      </ul>
    );
  }
  return (
    <ul className={list}>
      <li className={`${item} ${signIn}`}><Link to="/sign-in">Sign In</Link></li>
      <li className={`${item} ${signUp}`}><Link to='sign-up'>Sign Up</Link></li>
    </ul>
  )
}

Auth.defaultProp = {

};
Auth.propTypes = {
  user: PropTypes.objectOf.isRequired,
  getArticles: PropTypes.func.isRequired,
  update_user_from_cookies: PropTypes.func.isRequired,
  isLogOut:  PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});
export default connect(mapStateToProps, actions)( Auth);
