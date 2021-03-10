import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../Header';
import SingIn from '../SignIn';
import PostList from '../PostList/PostList';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import classes     from './App.module.scss';
import EditProfile from '../EditProfile/EditProfile';
import Article     from '../Article';

const App = () => (
    <BrowserRouter>
      <Header />
      <section className={classes.app}>
        <Route path="/" exact component={PostList} />
        <Route path="/signIn" component={SingIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/article" component={Article} />
        <Route path="/createArticle" component={CreateArticle} />
      </section>
    </BrowserRouter>
  );
export default App

