import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Header from '../Header';
import SingIn from '../SignIn';
import PostList from '../PostList/PostList';
import SignUp from '../SignUp';

import classes     from './App.module.scss';
import EditProfile from '../EditProfile/EditProfile';
import Article     from '../Article';


const App = () => {
  // const [ todo_list, setTodos ] = useState();
  // const [ filter, setFilter ] = useState( 'all' );
  const fn = (page) => {};

  return (
    <BrowserRouter>
      <section className={classes.app}>
        <Header />
        <Route path="/" exact component={PostList} />
        <Route path="/signIn" component={SingIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/article" component={Article} />
      </section>
    </BrowserRouter>
  );
};

App.propTypes = {

};
const mapStateToProps = (state) => ({
  page_number: state.page_number,
  pages: state.pages,
});
export default connect(mapStateToProps, actions)(App);
