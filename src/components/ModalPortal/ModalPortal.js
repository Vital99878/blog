import React   from 'react';
import ReactDom from 'react-dom'
import classes  from './ModalPortal.module.scss';

function ModalPortal( {deleteArticle, open, close}) {
  return ReactDom.createPortal(
    open &&
    <div className={classes.modal}>
      Modal component
      <button type='button' onClick={close}>Close</button>
      <button type='button' onClick={deleteArticle}>Yes, delete</button>
    </div>,
    document.getElementById('portal')
  );
}


export default ModalPortal;

