import React from 'react';
import styled from 'styled-components';
import Links from './Links';

const LinksGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
`; 

const LinksGroupTitle = styled.h2`
  font-weight: 600;
  font-size: 26px;
  color: #000b9f;
`;

export default class Sublist extends React.Component {
  render() {
    return (
      <LinksGroup>
        <LinksGroupTitle>{this.props.title}</LinksGroupTitle>
        <Links links={[...this.props.links].reverse()} />
      </LinksGroup>
    );
  }
}