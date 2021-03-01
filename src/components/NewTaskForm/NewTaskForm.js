import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './NewTaskForm.module.scss';

const NewTaskForm = ({ add_new_todo }) => {
  const [new_task_data, setNewTaskData] = useState({ label: '', min: '', sec: '' });
  const { label, min, sec } = new_task_data;

  const onSubmit = (event) => {
    event.preventDefault();
    add_new_todo(label, +min, +sec);
    setNewTaskData({ label: '', min: '', sec: '' });
  };

  const get_label = (event) => {
    const { name, value } = event.target;
    setNewTaskData({ ...new_task_data, ...{ [name]: value } });
  };

  return (
    <form className="new-task" onSubmit={onSubmit}>
      <input className="new-todo" name="label" placeholder="Test" onChange={get_label} value={label} />
      <input className="new-todo" name="min" type="number" placeholder="Min" onChange={get_label} value={min} />
      <input className="new-todo" name="sec" type="number" placeholder="Sec" onChange={get_label} value={sec} />
      <input className="new-todo__submit" type="submit" />
    </form>
  );
};
export default NewTaskForm;
NewTaskForm.propTypes = {
  add_new_todo: PropTypes.func.isRequired,
};
