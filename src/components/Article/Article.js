/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes           from 'prop-types';
import { Link }            from 'react-router-dom';
import { connect }         from 'react-redux';
import Writer              from '../Writer';
import classes             from './Article.module.scss';
import articles_service    from '../../api/blog_api';


function Article( { article, username, user } ) {

  if ( !article ) {
    return <div className={classes.loader}>Article loading ...</div>;
  }

  const { author, title, body, createdAt, description, favorited, favoritesCount, tagList, slug } = article;
  let [ count, setCount ] = useState( favoritesCount );
  let [ toggleHeart, setToggleHeart ] = useState( favorited );

  const tags = tagList.map( ( tag ) => (
    <li className={classes.tag}>
      <a href="">{tag}</a>
    </li>
  ) );
  let heartButtonClass;

  if ( toggleHeart ) {
    heartButtonClass = classes.redHeart;
  }
  else {
    heartButtonClass = classes.heart;
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
    <div className={classes.article}>
      <Writer author={author} createdAt={createdAt} />
      <div className={classes.title}>
        <h5>{title}</h5>
        <div className={classes.favorited}>
          <button type='button' className={heartButtonClass} onClick={() => toggleFavorite( toggleHeart )} />
          <p>{count}</p>
        </div>
      </div>
      <ul className={classes.tags}>{tags}</ul>
      <div className={classes.paragraph}>
        <p className={classes.description}> {description}</p>
        {  article.author.username === username &&
        <ul className={classes.list}>
          <li className={`${classes.item} ${classes.deleteArticle}`}>Delete</li>
          <li className={`${classes.item} ${classes.editArticle}`}><Link  to='/editArticle'>Edit</Link></li>
        </ul>
        }
      </div>
      <div className={classes.content}> {body} </div>

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

};

const mapStateToProps = ( state ) => (
  {
    article: state.article,
    username: state.username,
    user: state.user,


  });
export default connect( mapStateToProps, null )( Article );
