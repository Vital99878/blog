import React, {  }              from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Pagination }           from 'antd';
import './Pagination.css'
import { connect }              from 'react-redux';
import PropTypes                from 'prop-types';
import * as actions             from '../../redux/actions';
import Header                   from '../Header';
import SingIn                   from '../SignIn';
import PostList                 from '../PostList/PostList';
import SignUp                   from '../SignUp';
import classes                  from './App.module.scss';



const App = ({page_number}) => {
  // const [ todo_list, setTodos ] = useState();
  // const [ filter, setFilter ] = useState( 'all' );
  const fn = () => {};



  return (
    <BrowserRouter>
      <section className={classes.app}>
        <Header />
        <PostList />
        <Pagination
          current={page_number}
          pageSize={5}
          total={15}
        />
      </section>
      <Route path='/signIn' component={SingIn} />
      <Route path='/signUp' component={SignUp} />

    </BrowserRouter>
  );
};

App.propTypes = {
  page_number: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  page_number: state.page_number,
});
export default connect(mapStateToProps, actions)(App);

