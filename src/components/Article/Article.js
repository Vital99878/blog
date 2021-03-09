/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import * as actions from '../../redux/actions';
import Writer from '../Writer';
import classes from './Article.module.scss';

const spinStyle = { fontSize: 48, marginTop: '180px', color: 'lightgreen' };
const antIcon = <LoadingOutlined style={spinStyle} spin />;

function Article({ article, username, user, addToFavorite, removeFromFavorite }) {

  if (!article) {
    return <Spin indicator={antIcon} />;
  }

  const { author, title, body, createdAt, description, favorited, favoritesCount, tagList, slug } = article;

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
        {article.author.username === username && (
          <ul className={classes.list}>
            <li className={`${classes.item} ${classes.deleteArticle}`}>Delete</li>
            <li className={`${classes.item} ${classes.editArticle}`}>
              <Link to="/editArticle">Edit</Link>
            </li>
          </ul>
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
  user: PropTypes.objectOf.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
  username: state.username,
  user: state.user,
});

// lihoy84@yandex.ru

export default connect(mapStateToProps, actions)(Article);
