import React from 'react';
import styled from 'styled-components';

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 0 2px 8px #ecedff;
  margin-bottom: 20px;
  background: white;
  width: 510px;
`;

const StyledLinks = styled.a`
  width: 100%;
  height: 105px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  color: #56578c;
  box-shadow: 0 2px 8px #ecedff;
  line-height: 1.4;
  transition: color 300ms, border-radius 300ms, box-shadow 300ms;

  &:hover {
    color: #6067f1;
    box-shadow: 0 2px 8px #8f94ff;
    z-index: 1;
    border-radius: 5px;
  }
`;

export default class Links extends React.Component {
  render() {
    return (
      <LinksWrapper>
        {this.props.links.map(link => (
          <StyledLinks key={link.id} href={link.url} target="_blank">
            {link.title}
          </StyledLinks>
        ))}
      </LinksWrapper>
    );
  }
}
