import React        from 'react';
import PropTypes           from 'prop-types';
import { Link }     from 'react-router-dom';
import {connect}    from 'react-redux'
import Auth_hoc     from '../Auth_hoc/Auth_hoc';
import classes      from './Header.module.scss';

function Header({setArticleNull}) {
  return (
    <div className={classes.header}>
      <Link className={classes.logo} to='/' onClick={setArticleNull}>
        Realworld Blog
      </Link>
      <Auth_hoc/>
    </div>
  );
}

Header.propTypes = {
  setArticleNull: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
    setArticleNull: () => dispatch( { type: 'ARTICLE_NULL' } )
  })

export default connect(null, mapDispatchToProps)(Header);
