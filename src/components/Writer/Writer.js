import React from 'react';
import PropTypes from 'prop-types';
import classes from './Writer.module.scss';
import { date } from '../../utilities';
import mock from '../../img/defaultAvatar.png';

const Writer = ({ author, createdAt }) => {
  const { username, image } = author;

  return (
    <div className={classes.author}>
      <div className={classes.userData}>
        <div className={classes.username}>{username}</div>
        <div className={classes.created}>{date(createdAt)}</div>
      </div>
      <img src={image || mock} alt="Author" className={classes.avatar} />
    </div>
  );
};

Writer.defaultProp = {
  author: {},
};
Writer.propTypes = {
  author: PropTypes.objectOf.isRequired,
  createdAt: PropTypes.objectOf.isRequired,
};
export default Writer;
