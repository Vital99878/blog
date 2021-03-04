import React, { useEffect } from 'react';
import { connect }          from 'react-redux';
import { Pagination }       from 'antd';
import PropTypes            from 'prop-types';
import Post                 from '../Post';
import * as actions         from '../../redux/actions';
import classes              from './PostList.module.scss';
import './Pagination.css';

function PostList( { posts, offset, getArticles, loading, page_number, pages, set_offset } ) {

  useEffect( () => {
    getArticles( offset );
  },[offset] );

  if ( loading ) {
    return <div className={classes.loader}>Loading ...</div>;
  }

  const task_list = posts.map( ( post ) => (
    <Post post={post} />
  ) );
  return (
    <>
    <ul className={classes.list}>{task_list}</ul>
      <Pagination
        current={page_number}
        pageSize={5}
        total={pages}
        showSizeChanger = {false}
        onChange={(page) => {
          const updated_offset = page * 5 - 5
          set_offset(page , updated_offset);
        }}
      />
    </>
  );
}

PostList.defaultProp = {
  posts: [],
  toggle_status: () => {},
};
PostList.propTypes = {
  posts: PropTypes.arrayOf.isRequired,
  getArticles: PropTypes.func.isRequired,
  set_offset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  page_number: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,

};
const mapStateToProps = ( state ) => (
  {
    page_number: state.page_number,
    posts: state.posts,
    offset: state.offset,
    loading: state.loading,
    pages: state.pages
  });
export default connect( mapStateToProps, actions )( PostList );