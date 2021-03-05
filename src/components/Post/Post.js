/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import articles_service from '../../api/blog_api';
import Writer from '../Writer';
import classes from './Post.module.scss';


function Post({ post, getOneArticle, user, addToFavorite, removeFromFavorite }) {

  const { author, title,  createdAt, favorited, favoritesCount, tagList, slug, description } = post;
  const tags = tagList.map((tag) => (
    <li className={classes.tag}>
      <a href="">{tag}</a>
    </li>
  ));
  let heartButton;
  let [toggleHeart, setToggleHeart] = useState(favorited);
  let [count, setCount] = useState(favoritesCount);

  if (toggleHeart) {
    heartButton = classes.redHeart;
  } else {
    heartButton = classes.heart;
  }

  function toggleFavorite(toggleHeart) {
    if (user) {
      setToggleHeart((toggle) => !toggle);
      if (toggleHeart) {
        setCount((num) => num - 1);
        articles_service.remove_from_favorite(slug, user.token)
      }
      if (!toggleHeart) {
        setCount((num) => num + 1);
        articles_service.add_to_favorite(slug, user.token)
      }
    }
  }

  return (
    <>
      <li className={classes.item} key={Math.random() * 515}>
        <Writer author={author} createdAt={createdAt} />
        <div className={classes.title}>
          <Link to="/article" onClick={() => getOneArticle(slug, user)}>
            <h5>{title}</h5>
          </Link>
          <div className={classes.favorited}>
            <button type="button" className={heartButton} onClick={() => toggleFavorite(toggleHeart)} />
            <p>{count}</p>
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

const mapStateToProps = ( state ) => (
  {
    // post: state.post,
    user: state.user
  });

export default connect(mapStateToProps, actions)(Post);
