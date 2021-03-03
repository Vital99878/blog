import React    from 'react';
import classes  from './Header.module.scss';
import Auth_hoc from '../Auth_hoc/Auth_hoc';

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        Realworld Blog
      </div>
      <Auth_hoc/>
    </div>
  );
}

export default Header;
