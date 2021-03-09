import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
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
      <section className={classes.app}>
        <Header />
        <CreateArticle/>
        <Route path="/" exact component={PostList} />
        <Route path="/signIn" component={SingIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/article" component={Article} />
        <Route path="/createArticle" component={CreateArticle} />
      </section>
    </BrowserRouter>
  );

const mapStateToProps = (state) => ({
  page_number: state.page_number,
  pages: state.pages,
});
export default connect(mapStateToProps, actions)(App);
