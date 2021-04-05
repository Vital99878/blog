import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';
import classes from './Header.module.scss';

function Header({ setArticleNull }) {
  return (
    <div className={classes.bgWrapper}>
      <div className={classes.header}>
        <Link className={classes.logo} to="/articles" onClick={setArticleNull}>
          Realworld Blog
        </Link>
        <Auth />
      </div>
    </div>
  );
}

Header.propTypes = {
  setArticleNull: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  setArticleNull: () => dispatch({ type: 'ARTICLE_NULL' }),
});

export default connect(null, mapDispatchToProps)(Header);
