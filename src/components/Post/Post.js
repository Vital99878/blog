import React     from 'react';
import './Post.module.scss';
import PropTypes from 'prop-types';


function Post( { todo } ) {
  return (
    <div className={`view ${todo.status}`}>
      Post {todo.label}
    </div>
  );
}

Post.defaultProp = {
  label: '',
  created: 'ett',
  status: '',
  id: Math.random() * 784,
};
Post.propTypes = {
  todo: PropTypes.objectOf.isRequired,
};
export default Post;