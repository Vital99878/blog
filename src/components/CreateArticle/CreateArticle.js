import React, { useState, useEffect } from 'react';
import { withRouter, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions';
import classes from './CreateArticle.module.scss';
import Loader from '../Loader';

const { article__forms, article__label, article__button, article__button__disabled, article__input } = classes;
const { article__body, article__title, article__tags, article__tag, article__add_tag, article__delete_tag } = classes;

const CreateArticle = ({ postArticle, updateArticle, token, history, location, user, article, getOneArticle }) => {
  const articleTags =
    article && location.pathname !== '/new-article'
      ? article.tagList.map((item, index) => ({ id: index, value: item }))
      : [{ id: 0, value: '' }];

  const [tagsList, setTagsList] = useState(articleTags);
  const [once, setOnce] = useState(false);
  const [buttonClass, setButtonClass] = useState(article__button);
  const { register, handleSubmit, errors } = useForm();
  const { slug } = useParams();

  useEffect(() => {
    if (location.pathname !== '/new-article') {
      getOneArticle(slug, user);
    }
  }, []);

  useEffect(() => {
    if (article && location.pathname !== '/new-article') {
      setTagsList(
        article.tagList.map((item, index) => ({
          id: index,
          value: item,
        }))
      );
    }
  }, [article]);

  useEffect(() => {
    setButtonClass(once ? article__button__disabled : article__button);
  }, [once]);

  if (location.pathname === '/new-article') article = { title: null, description: null, body: null };

  if (location.pathname !== '/new-article' && user?.username !== article.author.username) {
    return <Redirect to="/articles" />;
  }

  if (!article && location.pathname !== '/new-article') return <Loader />;

  if (!token) return <Redirect to="/sign-in" />;

  function getTagLabel(label, id) {
    setTagsList(
      tagsList.map((item) => {
        if (item.id === id) {
          item.value = label;
        }
        return item;
      })
    );
  }

  function deleteTag(id) {
    setTagsList(tagsList.filter((item) => item.id !== id));
  }

  const tags = tagsList.map((item) => (
    <div className={article__tag}>
      <input
        className={article__input}
        type="text"
        onChange={(evt) => getTagLabel(evt.target.value, item.id)}
        value={item.value}
        name={item.id}
        placeholder="tag"
      />
      <button className={article__delete_tag} onClick={() => deleteTag(item.id)} data-ind={item.id} type="button">
        Delete
      </button>
    </div>
  ));

  async function onSubmit(data) {
    if (once) return;
    setOnce(true);
    const tagList = tagsList.map((item) => item.value);

    if (location.pathname !== '/new-article') {
      const updatedArticle = await updateArticle({ ...data, tagList }, token, article.slug);
      if (updatedArticle && !updatedArticle.errors) {
        history.push(`/articles/${updatedArticle.article.slug}`);
      } else history.push('/alert');
      return;
    }

    const newArticle = await postArticle({ ...data, tagList }, token);
    if (newArticle) history.push(`/articles/${newArticle.article.slug}`);
  }

  return (
    <div className={classes.article}>
      <h6 className={article__title}>{article.title ? 'Edit Article' : 'Create Article'}</h6>
      <div className={article__forms}>
        <label className={article__label}>
          Title
          <input
            ref={register({ required: true })}
            name="title"
            className={article__input}
            type="text"
            placeholder="Title"
            defaultValue={article.title}
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
            defaultValue={article.description}
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
            defaultValue={article.body}
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
            onClick={() => {
              const maxId = tagsList.reduce((acc, el) => el.id, 0);
              setTagsList(() => [...tagsList, { id: maxId + 1 }]);
            }}
            type="button"
          >
            Add tag
          </button>
        </form>
      </div>
      <button className={buttonClass} onClick={handleSubmit(onSubmit)} type="submit" disabled={once}>
        Send
      </button>
    </div>
  );
};

CreateArticle.defaultProp = {};
CreateArticle.propTypes = {
  postArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getOneArticle: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  user: PropTypes.objectOf.isRequired,
  article: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  token: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.authReducer.user ? state.authReducer.user.token : null,
  user: state.authReducer.user,
  article: state.blogReducer.article,
});
export default connect(mapStateToProps, actions)(withRouter(CreateArticle));
