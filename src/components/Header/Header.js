import React    from 'react';
import { Link } from 'react-router-dom';
import classes  from './Header.module.scss';
import Auth_hoc from '../Auth_hoc/Auth_hoc';

function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes.logo} to='/'>
        Realworld Blog
      </Link>
      <Auth_hoc/>
    </div>
  );
}

export default Header;
