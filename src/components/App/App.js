import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from 'antd';
import './Alert.scss';
import Header from '../Header';
import SingIn from '../SignIn';
import PostList from '../PostList/PostList';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import classes from './App.module.scss';
import EditProfile from '../EditProfile/EditProfile';
import Article from '../Article';
import Page_404 from '../Page_404';

const App = () => (
  <BrowserRouter>
    <Header />
    <Route
      path="/alert"
      render={() => {
        window.scrollTo(0, 0);
        return (
          <Alert
            message="You are not author for this Article"
            description="You can edit just yore article"
            type="info"
          />
        );
      }}
    />
    <section className={classes.app}>
      <Switch>
        <Route path={['/', '/articles']} exact component={PostList} />
        <Route path="/articles/:slug" exact component={Article} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/articles/:slug/edit" component={CreateArticle} />
        <Route path="/sign-in" component={SingIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/" component={Page_404} />
      </Switch>
    </section>
  </BrowserRouter>
);
export default App;
