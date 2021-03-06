import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import classes from './Test.module.scss';
// import PropTypes from 'prop-types';
const {test} = classes;

function Test() {
  const markdown = `Just a link: https://reactjs.com.`
  const markdown_2 = `This ~is not~ strikethrough, but ~~this is~~!`
  return (
    <div className={test}>
      <ReactMarkdown  plugins={[gfm]} children={markdown_2} />
    </div>
  );
}

Test.defaultProp = {

};
Test.propTypes = {

};
export default Test;