/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import * as actions from '../../redux/actions';
import Writer from '../Writer';
import classes from './Article.module.scss';
import Loader from '../Loader';
import ModalDelete from '../ModalDelete';

function Article({ article, user, addToFavorite, removeFromFavorite, deleteArticle, getOneArticle, slug }) {
  let [modalIsOpen, setModalIsOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getOneArticle(slug, user);
  }, []);

  if (!article) {
    return <Loader />;
  }

  if (!article.title) {
    return <Redirect to="/articles" />;
  }

  const { author, title, body, createdAt, description, favorited, favoritesCount, tagList } = article;

  const tags = tagList.map((tag) => (
    <li className={classes.tag}>
      <a href="">{tag}</a>
    </li>
  ));
  let heartButtonClass;

  if (favorited) {
    heartButtonClass = classes.redHeart;
  } else {
    heartButtonClass = classes.heart;
  }

  function toggleFavorite() {
    if (user) {
      if (favorited) {
        removeFromFavorite(slug, user.token);
      }
      if (!favorited) {
        addToFavorite(slug, user.token);
      }
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={classes.article}>
      <Writer author={author} createdAt={createdAt} />
      <div className={classes.title}>
        <h5>{title}</h5>
        <div className={classes.favorited}>
          <button type="button" className={heartButtonClass} onClick={() => toggleFavorite()} />
          <p>{favoritesCount}</p>
        </div>
      </div>
      <ul className={classes.tags}>{tags}</ul>
      <div className={classes.paragraph}>
        <p className={classes.description}> {description}</p>
        {user && article.author.username === user.username && (
          <div className={classes.list}>
            <button
              className={`${classes.item} ${classes.deleteArticle}`}
              type="button"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              <ModalDelete
                deleteArticle={() => deleteArticle(article.slug, user.token)}
                open={modalIsOpen}
                closeModal={closeModal}
              />
              Delete
            </button>
            <button type="button" className={`${classes.item} ${classes.editArticle}`}>
              <Link to={{ pathname: `/articles/${slug}/edit`, state: { updateArticle: article } }}>Edit</Link>
            </button>
          </div>
        )}
      </div>
      <div className={classes.content}>
        <ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

Article.defaultProp = {
  post: {},
};

Article.propTypes = {
  article: PropTypes.objectOf.isRequired,
  username: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  getOneArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.blogReducer.article,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, actions)(Article);
