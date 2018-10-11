import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  color: #ff8466;
`;

const H2 = styled.h2`
  color: #ffd484;
`;

const NonStatic = () => (
  <React.Fragment>
    <H1>This is a route without the layout wrapper.</H1>
    <H2>I want to be non-statically rendered.</H2>
  </React.Fragment>
);

export default NonStatic;