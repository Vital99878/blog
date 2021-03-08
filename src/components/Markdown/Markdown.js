import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm     from 'remark-gfm'
import classes from './Markdown.module.scss';
// import PropTypes from 'prop-types';


function Markdown() {
  const markdown = `Just a link: https://reactjs.com.`
  const markdown_2 = `This ~is not~ strikethrough, but ~~this is~~!`
  const table = `A paragraph with *emphasis* and  **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
| a | b |

`

  return (
    <div className={markdown}>
      <ReactMarkdown  plugins={[gfm]}>
        {table}
      </ReactMarkdown>
      <input />
    </div>
  );
}

Markdown.defaultProp = {

};
Markdown.propTypes = {

};
export default Markdown;