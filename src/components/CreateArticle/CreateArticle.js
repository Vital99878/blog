import React, { useRef, useState, useEffect } from 'react';
import PropTypes                              from 'prop-types';
import { connect }                            from 'react-redux';
import { useForm }                 from 'react-hook-form';
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

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ( data ) => {
    const {title,description, body, tags} = data;
    console.log(data)
    console.log('wwwr')
  };

  function createTag() {
    const index = Math.random() * 1500;
    return {
      tag: (
        <div className={article__tag}>
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
          <input ref={register({required: true})}
                 name='title'
                 className={article__input}
                 type="text"
                 placeholder="Title" />
          {errors.title && errors.title.type === 'required' && <span className={classes.warning}>Title is required</span>}
        </label>
        <label className={article__label}>
          Short description
          <input
            ref={register({required: true})}
            name='description'
            className={article__input} type="text" required placeholder="Short description" />
          {errors.description && errors.description.type === 'required' && <span className={classes.warning}>Description is required</span>}
        </label>
        <label className={article__label}>
          Text
          <textarea
            ref={register({required: true, minLength: 30})}
            name='body'
            className={article__body} cols={30} required placeholder="Text" />
          {errors.body && errors.body.type === 'required' && <span className={classes.warning}>Body of article is required</span>}
          {errors.body && errors.body.type === 'minLength' && <span className={classes.warning}>
            minimum characters of article is 30</span>}
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
      <button className={article__button} onClick={handleSubmit(onSubmit)} type="submit">
        Send
      </button>
    </div>
  );
};

CreateArticle.defaultProp = {};
CreateArticle.propTypes = {
  create_article: PropTypes.func.isRequired,
};

export default connect( null, actions )( CreateArticle );
