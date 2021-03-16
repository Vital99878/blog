import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './CreateArticle.module.scss';

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

const CreateArticle = ({ postArticle, updateArticle, token, history, location }) => {
  let defaultArticleHeader = 'Create new article';
  let defaultTitle = null;
  let defaultDescription = null;
  let defaultBody = null;

  const { register, handleSubmit, errors } = useForm();

  const [tagsList, setTagsList] = useState(
    location.state
      ? location.state.updateArticle.tagList.map((item) => ({
          id: Math.round(Math.random() * 100),
          defaultValue: item,
        }))
      : []
  );

  const [tagsValues, setTagsValue] = useState({});

  if (location.state) {
    const { title, description, body } = location.state.updateArticle;
    defaultArticleHeader = 'Edit article';
    defaultTitle = title;
    defaultDescription = description;
    defaultBody = body;
  }

  const get_label = (event) => {
    const { name, value } = event.target;
    setTagsValue({ ...tagsValues, ...{ [name]: value } });
  };

  function deleteTag(evt) {
    const targetInd = Number(evt.target.dataset.ind);
    setTagsValue((oldTags) => {
      const newTags = { ...oldTags };
      delete newTags[targetInd];
      return newTags;
    });
    setTagsList((list) => list.filter((item) => item.id !== targetInd));
  }

  const tags = tagsList.map((item, index) => (
    <div className={article__tag}>
      <input
        className={article__input}
        type="text"
        onChange={get_label}
        defaultValue={tagsList[index].defaultValue}
        name={item.id}
        placeholder="tag"
      />
      <button className={article__delete_tag} onClick={deleteTag} data-ind={item.id} type="button">
        Delete
      </button>
    </div>
  ));

  const onSubmit = async (data) => {
    const tagList = [];
    for (const key in tagsValues) {
      tagList.push(tagsValues[key]);
    }
    if (location.state) {
      const { slug } = location.state.updateArticle;
      const newArticle = await updateArticle({ ...data, tagList }, token, slug);
      if (newArticle) {
        history.push(`/article/${newArticle.article.slug}`);
      }
    } else {
      const newArticle = await postArticle({ ...data, tagList }, token);
      if (newArticle) {
        history.push(`/article/${newArticle.article.slug}`);
      }
    }
  };

  if (!token ) {
    return  <Redirect to='/signIn'/>
  }

  return (
    <div className={article}>
      <h6 className={article__title}>{defaultArticleHeader}</h6>
      <div className={article__forms}>
        <label className={article__label}>
          Title
          <input
            ref={register({ required: true })}
            name="title"
            className={article__input}
            type="text"
            placeholder="Title"
            defaultValue={defaultTitle}
          />
          {errors.title && errors.title.type === 'required' && (
            <span className={classes.warning}>Title is required</span>
          )}
        </label>
        <label className={article__label}>
          Short description
          <input
            ref={register({ required: true })}
            name="description"
            className={article__input}
            type="text"
            required
            placeholder="Short description"
            defaultValue={defaultDescription}
          />
          {errors.description && errors.description.type === 'required' && (
            <span className={classes.warning}>Description is required</span>
          )}
        </label>
        <label className={article__label}>
          Text
          <textarea
            ref={register({ required: true, minLength: 30 })}
            name="body"
            className={article__body}
            cols={30}
            required
            defaultValue={defaultBody}
            placeholder="Text"
          />
          {errors.body && errors.body.type === 'required' && (
            <span className={classes.warning}>Body of article is required</span>
          )}
          {errors.body && errors.body.type === 'minLength' && (
            <span className={classes.warning}>minimum characters of article is 30</span>
          )}
        </label>
        <form className={article__tags}>
          Tags
          {tags}
          <button
            className={article__add_tag}
            onClick={() => setTagsList((list) => [...list, { id: Math.round(Math.random() * 100) }])}
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
  postArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user ? state.user.token : null,
});

export default connect(mapStateToProps, actions)(withRouter(CreateArticle));
