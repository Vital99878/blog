import React, {  }      from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import classes                  from './App.module.scss';
import Header                   from '../Header';
import SingIn                   from '../SignIn';
import PostList         from '../PostList/PostList';
import SignUp           from '../SignUp';

// import Test                from '../Test';



const App = () => {
  // const [ todo_list, setTodos ] = useState();
  // const [ filter, setFilter ] = useState( 'all' );
  const fn = () => {};

  return (
    <BrowserRouter>
      <section className={classes.app}>
        <Header />
        <PostList />
      </section>
      <Route path='/signIn' component={SingIn} />
      <Route path='/signUp' component={SignUp} />
    </BrowserRouter>
  );
};

export default App;
