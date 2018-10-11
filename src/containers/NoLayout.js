import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  color: #0062bf;
`;

const H2 = styled.h2`
  color: #47ceff;
`;

const NoLayout = () => (
  <React.Fragment>
    <H1>This is a route without the layout wrapper.</H1>
    <H2>I want to be statically rendered.</H2>
  </React.Fragment>
);

export default NoLayout;