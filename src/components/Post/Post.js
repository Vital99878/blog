/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../redux/actions';
import Writer from '../Writer';
import classes from './Post.module.scss';

function Post({ post, getOneArticle, user, addToFavorite, removeFromFavorite }) {
  const { author, title, createdAt, favorited, favoritesCount, tagList, slug, description } = post;
  let heartButtonClass;
  const tags = tagList.map((tag) => (
    <li className={classes.tag}>
      <a href="">{tag}</a>
    </li>
  ));

  if (favorited) {
    heartButtonClass = classes.redHeart;
  } else {
    heartButtonClass = classes.heart;
  }

  function toggleFavorite(favorited) {
    if (user) {
      if (favorited) {
        removeFromFavorite(slug, user.token);
      }
      if (!favorited) {
        addToFavorite(slug, user.token);
      }
    }
  }

  return (
    <>
      <li className={classes.item} key={Math.random() * 515}>
        <Writer author={author} createdAt={createdAt} />
        <div className={classes.title}>
          <Link to={`/articles/${slug}`}>
            <h5>{title}</h5>
          </Link>
          <div className={classes.favorited}>
            <button type="button" className={heartButtonClass} onClick={() => toggleFavorite(favorited)} />
            <p>{favoritesCount}</p>
          </div>
        </div>
        <ul className={classes.tags}>{tags}</ul>
        <p className={classes.description}> {description} </p>
      </li>
    </>
  );
}

Post.defaultProp = {
  post: {},
};
Post.propTypes = {
  user: PropTypes.objectOf.isRequired,
  post: PropTypes.objectOf.isRequired,
  getOneArticle: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, actions)(Post);
