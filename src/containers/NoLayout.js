import React from 'react';

const NoLayout = () => (
  <React.Fragment>
    <h1>This is a route without the layout wrapper.</h1>
    <h2>I want to be statically rendered.</h2>
  </React.Fragment>
);

export default NoLayout;