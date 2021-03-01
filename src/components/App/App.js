import React, { useState } from 'react';
import classes                        from './App.module.scss';
import Header                         from '../Header';
import Test                           from '../Test';
import NewTaskForm                    from '../NewTaskForm';
import PostList                       from '../PostList';


const App = () => {
  const [todo_list, setTodos] = useState();
  const [filter, setFilter] = useState('all');
  const fn = () => {}

    return (
    <section className={classes.app}>
      <Header  />
      <NewTaskForm add_new_todo={fn}/>
      <PostList toggle_status={fn} remove_todo={fn}/>
      <Test/>
    </section>
  );
};

export default App;
