import React from 'react';
import PropTypes from 'prop-types';
import classes from './User.module.scss';
import mock from '../../img/defaultAvatar.png';

const User = ({ user }) => {
  const { username, image } = user;
  return (
    <div className={classes.author}>
      <div className={classes.userData}>
        <div className={classes.username}>{username}</div>
      </div>
      <img src={image || mock} alt="Author" className={classes.avatar} />
    </div>
  );
};

User.defaultProp = {
  user: {},
};
User.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
export default User;
