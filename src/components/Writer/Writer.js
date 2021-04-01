import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Writer.module.scss';
import { date } from '../../utilities';
import mock from '../../img/defaultAvatar.png';

const Writer = ({ author, createdAt }) => {
  const { username, image } = author;
  const [validPath, setValidPath] = useState(true);

  return (
    <div className={classes.author}>
      <div className={classes.userData}>
        <div className={classes.username}>{username}</div>
        <div className={classes.created}>{date(createdAt)}</div>
      </div>
      <img onError={() => setValidPath(false)} src={validPath ? image : mock} alt="Author" className={classes.avatar} />
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
