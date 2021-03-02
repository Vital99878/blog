import React     from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './PostList.module.scss';
import Post      from '../Post';
import * as actions from '../../redux/actions';

function PostList( { posts }) {
  console.log(posts)

  const task_list = posts.map((post) => (
    <Post post={post}/>
  ));
  return (
      <ul className={classes.list}>{task_list}</ul>
  );
}

PostList.defaultProp = {
  posts: [],
  toggle_status: () => {},
};
PostList.propTypes = {
  posts: PropTypes.arrayOf.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, actions)(PostList);