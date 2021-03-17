import React from 'react';
import PropTypes from 'prop-types';
import classes from './ModalDelete.module.scss';

function ModalDelete({ deleteArticle, open, closeModal }) {
  return (
    open && (
      <div className={classes.modal}>
        <p>Are you sure to delete this article?</p>
        <div className={classes.buttons}>
          <button
            className={classes.no}
            type="button"
            onClick={(evt) => {
              evt.stopPropagation();
              closeModal();
            }}
          >
            No
          </button>
          <button className={classes.yes} type="button" onClick={deleteArticle}>
            Yes
          </button>
        </div>
      </div>
    )
  );
}

ModalDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalDelete;
