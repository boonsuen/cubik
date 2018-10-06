import React from 'react';

const NonStatic = () => (
  <React.Fragment>
    <h1>This is a route without the layout wrapper.</h1>
    <h2>I want to be non-statically rendered.</h2>
  </React.Fragment>
);

export default NonStatic;