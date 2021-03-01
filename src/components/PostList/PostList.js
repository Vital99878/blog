import React     from 'react';
import './PostList.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post      from '../Post';
import * as actions from '../../redux/actions';

function PostList( { todos }) {
  console.log(todos)

  const task_list = todos.map((todo) => (
    <li key={todo.id}>
      <Post todo={todo}/>
    </li>
  ));
  return (
    <section className="main">
      <ul className="todo-list">{task_list}</ul>
    </section>
  );
}

PostList.defaultProp = {
  todos: [],
  toggle_status: () => {},
  id: Math.random() * 784,
};
PostList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, actions)(PostList);
