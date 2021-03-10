import React, { useEffect } from 'react';
import { connect }          from 'react-redux';
import { Pagination, Spin } from 'antd';
import PropTypes            from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import Post                 from '../Post';

import * as actions         from '../../redux/actions';
import classes              from './PostList.module.scss';
import './Pagination.css';


const spinStyle = { fontSize: 60, marginTop: "180px", color: 'lightgreen' }
const antIcon = <LoadingOutlined style={spinStyle} spin />;

function PostList( { posts, offset, getArticles, loading, page_number, pages, set_offset, user } ) {

  useEffect( () => {
    getArticles( offset, user );
  },[offset] );

  if ( loading ) {
    return <Spin indicator={antIcon} />
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
          window.scrollTo(0, 0);
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
  user: PropTypes.objectOf.isRequired,

};
const mapStateToProps = ( state ) => (
  {
    page_number: state.page_number,
    posts: state.posts,
    offset: state.offset,
    loading: state.loading,
    pages: state.pages,
    user: state.user
  });
export default connect( mapStateToProps, actions )( PostList );