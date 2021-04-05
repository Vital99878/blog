/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import * as actions from '../../redux/actions';
import Writer from '../Writer';
import classes from './Article.module.scss';
import Loader from '../Loader';
import ModalDelete from '../ModalDelete';
import Page_404 from '../Page_404';

const Article = ({ article, user, addToFavorite, removeFromFavorite, deleteArticle, getOneArticle }) => {
  let [modalIsOpen, setModalIsOpen] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getOneArticle(slug, user);
  }, []);

  if (article === 404) return <Page_404 />;
  if (!article) return <Loader />;
  if (!article.title) return <Redirect to="/articles" />;

  const { author, title, body, createdAt, description, favorited, favoritesCount, tagList } = article;

  const tags = tagList.map((tag) => (
    <li className={classes.tag}>
      <a href="">{tag}</a>
    </li>
  ));

  let favoriteClass;
  favorited ? (favoriteClass = classes.favorite) : (favoriteClass = classes.noFavorite);

  function toggleFavorite() {
    if (user) favorited ? removeFromFavorite(slug, user.token) : addToFavorite(slug, user.token);
    return <Redirect to="sign-in" />;
  }

  return (
    <div className={classes.article}>
      <Writer author={author} createdAt={createdAt} />
      <div className={classes.title}>
        <h5>{title}</h5>
        <div className={classes.favorited}>
          <button type="button" className={favoriteClass} onClick={() => toggleFavorite()} />
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
                closeModal={() => setModalIsOpen(false)}
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
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

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
