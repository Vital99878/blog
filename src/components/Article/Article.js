/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions         from '../../redux/actions';
import Writer from '../Writer';
import classes from './Post.module.scss';

function Article({ post }) {
  const { author, title, body, createdAt, updatedAt, description, favorited, favoritesCount, tagList, slug } = post;
  const tags = tagList.map((tag, index) => {
    if (index === 0) {
      return (
        <li className={classes.firstTag}>
          <a href="">{tag}</a>
        </li>
      );
    }
    return (
      <li className={classes.tag}>
        <a href="">{tag}</a>
      </li>
    )
  });
  let heartButton;
  let [toggleHeart, setToggleHeart] = useState(favorited);
  let [count, setCount] = useState(favoritesCount);

  if (toggleHeart) {
    heartButton = classes.redHeart;
  } else {
    heartButton = classes.heart;
  }

  function toggleFavorite(toggleHeart) {
    setToggleHeart((toggle) => !toggle);
    if (toggleHeart) {
      setCount((num) => num - 1);
    }
    if (!toggleHeart) {
      setCount((num) => num + 1);
    }
  }

  return (
    <div className={classes.item} key={Math.random() * 515}>
      <Writer author={author} createdAt={createdAt} updatedAt={updatedAt} />
      <div className={classes.title}>
        <Link to='/article'><h5>{title}</h5></Link>
        <div className={classes.favorited}>
          <button type='button' className={heartButton} onClick={() => toggleFavorite( toggleHeart )} />
          <p>{count}</p>
        </div>
      </div>
      <ul className={classes.tags}>{tags}</ul>
      <p> {body} </p>
    </div>
  );
}

Article.defaultProp = {
  post: {},
};
Article.propTypes = {
  post: PropTypes.objectOf.isRequired,
};
export default Article;
