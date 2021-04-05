import React from 'react';
import classes from './Page_404.module.scss';

function Page_404() {
  return (
    <div className={classes.main}>
      <p>The page with this address does not exist.</p> <p>Enter a different URL address ( error 404 )</p>
    </div>
  );
}

export default Page_404;
