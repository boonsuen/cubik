import React from 'react';
import styled from 'styled-components';

import AddIcon from '../assets/img/icons/add.svg';
import EditIcon from '../assets/img/icons/edit.svg';
import DeleteIcon from '../assets/img/icons/delete.svg';

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 0 2px 8px #ecedff;
  margin-bottom: 20px;
  background: white;
  width: 510px;
  border-radius: 5px;
`;

const StyledLink = styled.a`
  width: 100%;
  height: 105px;
  box-sizing: border-box;
  padding: 30px;
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

  &:last-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const EmptyLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 105px;
  box-sizing: border-box;
  padding: 30px;
  box-shadow: 0 2px 8px #ecedff;
  color: #818195;
  font-style: italic;
`;

const LinkAction = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;

  button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
`;

const LeftIcon = styled.button`
  margin-right: 20px;
  background: #fcf4ff;
`;

const RightIcon = styled.button`
  margin-left: auto;
  background: #fff4f4;
`

export default class Links extends React.Component {
  render() {
    return (
      <LinksWrapper>      
        <LinkAction>
          <LeftIcon type="button" onClick={() => {
            this.props.showAddLinkModal({
              listId: this.props.listId,
              id: this.props.groupId,
              name: this.props.groupName
            });
          }}>
            <img src={AddIcon} 
          />
          </LeftIcon>
          <LeftIcon type="button">
            <img src={EditIcon} />
          </LeftIcon>
          <RightIcon type="button">
            <img src={DeleteIcon} />
          </RightIcon>
        </LinkAction>
        {this.props.links.length !== 0 ? (
          this.props.links.map(link => (
            <StyledLink key={link.id} href={link.url} target="_blank">
              {link.title}
            </StyledLink>
          ))
        ) : (
          <EmptyLink>No links here</EmptyLink>
        )}  
      </LinksWrapper>
    );
  }
}
