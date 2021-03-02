import React, { useState } from 'react';
import { BrowserRouter }   from 'react-router-dom';
import classes             from './App.module.scss';
import Header              from '../Header';
import SingIn              from '../SignIn';
import EditProfile         from '../EditProfile';
import Test                from '../Test';
import CreateNewAccount    from '../CreateNewAccount/CreateNewAccount';


const App = () => {
  const [ todo_list, setTodos ] = useState();
  const [ filter, setFilter ] = useState( 'all' );
  const fn = () => {};

  return (
    <BrowserRouter>
      <section className={classes.app}>
        <Header />
        <CreateNewAccount/>
        <EditProfile/>
        <SingIn />
      </section>
    </BrowserRouter>
  );
};

export default App;
