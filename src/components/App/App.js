import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
      <Route path="/" exact component={PostList} />
      <Route path="/signIn" component={SingIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/editProfile" component={EditProfile} />
      <Route
        path="/article/:slug"
        exact
        render={({ match }) => {
          const { slug } = match.params;
          return <Article slug={slug} />;
        }}
      />
      <Route path="/createArticle" component={CreateArticle} />
      <Route
        path="/article/:slug/edit"
        render={({ match }) => {
          const { slug } = match.params;
          return <CreateArticle slug={slug} />;
        }}
      />
    </section>
  </BrowserRouter>
);
export default App;
