import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import classes      from './Auth_hoc.module.scss';


const Auth_hoc = ( { auth }) => {
  if (auth ) {
    return (
      <div className=''>
        createButton User logOutButton
      </div>
    )
  }
  return (
    <div className=''>
      signIn, signUp
    </div>
  )
}




Auth_hoc.defaultProp = {

};
Auth_hoc.propTypes = {
  auth: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, actions)(Auth_hoc);
