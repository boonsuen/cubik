import React from 'react';
import styled from 'styled-components';
import Links from './Links';

const GroupWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`; 

const GroupTitle = styled.h2`
  box-sizing: border-box;
  padding-bottom: 3px;
  margin: 21px 0 17px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.inEditMode ? "#d3d8ec" : "transparent"};
  color: #000b9f;
  font-size: 26px;
  font-weight: 600;
  transition: border-bottom-color 0.3s;
  cursor: ${props => props.inEditMode && "pointer"};
`;

export default class Group extends React.Component {
  state = {
    inEditMode: false
  };
  handleTitleClick = () => {
    if (!this.state.inEditMode) return;
    console.log('yoyoyo');
    this.props.toggleRenameGroupModal();
  };
  toggleEditMode = () => {
    this.setState(({ inEditMode }) => ({ inEditMode: !inEditMode }));
  };
  render() {
    const { inEditMode } = this.state;
    return (
      <GroupWrapper>
        <GroupTitle 
          inEditMode={inEditMode} 
          onClick={this.handleTitleClick}
        >
          {this.props.name}
        </GroupTitle>
        <Links 
          listId={this.props.listId}
          groupId={this.props.id}
          groupName={this.props.name}
          links={[...this.props.links].reverse()}         
          showAddLinkModal={this.props.showAddLinkModal}
          inEditMode={inEditMode}
          toggleEditMode={this.toggleEditMode}          
        />
      </GroupWrapper>
    );
  }
}