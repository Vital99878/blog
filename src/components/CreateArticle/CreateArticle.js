import React, { useRef, useState, useEffect } from 'react';
import PropTypes                              from 'prop-types';
import { connect }                            from 'react-redux';
import * as actions                           from '../../redux/actions';
import classes                                from './CreateArticle.module.scss';


const {
  article__title,
  article,
  article__forms,
  article__label,
  article__button,
  article__input,
  article__body,
  article__tags,
  article__tag,
  article__add_tag,
  article__delete_tag,
} = classes;

const CreateArticle = ( { create_article } ) => {

  function createTag() {
    const index = Math.random() * 1500;
    return {
      tag: (
        <div className={article.tag}>
          <input className={article__input} type="text" required placeholder="tag" />
          <button className={article__delete_tag} data-ind={index} type="button">
            Delete
          </button>
        </div>
      ),
      index,
    };
  }

  const [ tagsList, setTagsList ] = useState( [ createTag() ] );

  function deleteTag( evt ) {
    const targetInd = Number(evt.target.dataset.ind);
    setTagsList( tagsList.filter( tag => tag.index !== targetInd ) );
  }

  useEffect( () => {
    const tags_button_delete = document.querySelectorAll( `.${article__delete_tag}` );
    tags_button_delete.forEach( button => button.addEventListener( 'click', deleteTag ) );
  }, [ tagsList ] );

  return (
    <div className={article}>
      <h6 className={article__title}>Create new article</h6>
      <div className={article__forms}>
        <label className={article__label}>
          Title
          <input className={article__input} type="text" required placeholder="Title" />
        </label>
        <label className={article__label}>
          Short description
          <input className={article__input} type="text" required placeholder="Short description" />
        </label>
        <label className={article__label}>
          Text
          <textarea className={article__body} cols={30} required placeholder="Text" />
        </label>
        <form className={article__tags}>
          Tags
          {tagsList.map( ( item ) => item.tag )}
          <button
            className={article__add_tag}
            onClick={() =>
              setTagsList( () => [ ...tagsList, createTag() ] )
            }
            type="button"
          >
            Add tag
          </button>
        </form>
      </div>
      <button className={article__button} type="submit">
        Send
      </button>
    </div>
  );
};

CreateArticle.defaultProp = {};
CreateArticle.propTypes = {
  create_article: PropTypes.func.isRequired,
};

// lihoy84@yandex.ru 1234567v

export default connect( null, actions )( CreateArticle );
