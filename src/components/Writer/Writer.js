import React          from 'react';
import PropTypes      from 'prop-types';
import classes        from './Writer.module.scss';
import { monthNames } from '../../utilities';


const Writer = ( { author, createdAt } ) => {
  const date = `${monthNames[ new Date( createdAt ).getMonth() ]} ${new Date( createdAt ).getDate()}, ${new Date( createdAt ).getFullYear()}`;

  const { username, image } = author;
  return (
    <div className={classes.author}>
      <div className={classes.userData}>
        <div className={classes.username}>
          {username}
        </div>
        <div className={classes.created}>
          {date}
        </div>
      </div>
      <img src={image} alt="Author" className={classes.avatar} />
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