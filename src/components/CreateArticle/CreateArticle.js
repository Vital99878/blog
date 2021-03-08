import React, { useRef, useState } from 'react';
import PropTypes                   from 'prop-types';
import { connect }                 from 'react-redux';
import * as actions from '../../redux/actions';
import classes      from './CreateArticle.module.scss';


const { article__title, article, article__forms, article__label, article__button, article__input, article__body } = classes;


const CreateArticle = ( { create_article } ) => (
    <div className={article}>
      <h6 className={article__title}>Create new article</h6>
      <div className={article__forms}>
        <label className={article__label}>Title
          <input
                 className={article__input}
                 type='text'
                 required
                 placeholder='Title'
                 />
        </label>
        <label className={article__label}>Short description
          <input
                 className={article__input}
                 type='text'
                 required
                 placeholder='Short description'
                 />
        </label>
        <label className={article__label}>Text
          <textarea
            className={article__body}
            cols={30}
            type='text-area'
            required
            placeholder='Text'
          />
        </label>
      </div>
      <button className={article__button} type='submit'>Send</button>
    </div>
  );

CreateArticle.defaultProp = {};
CreateArticle.propTypes = {
  create_article: PropTypes.func.isRequired,
};

// lihoy84@yandex.ru 1234567v

export default connect( null, actions )( CreateArticle );