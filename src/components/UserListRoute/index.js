import React from 'react';
import styled from 'styled-components';
import AddGroup from './AddGroup';
import Group, { GroupTitle } from '../Group';
import EmptyState from './EmptyState';

import db from '../../firebase/db';
import { GroupsContainer } from '../app.css';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
`;

export default class UserListRoute extends React.Component {
  state = {
    groupsData: this.props.groupsData,
    ungroupedLinks: this.props.ungroupedLinks,
    isEmptyState:
      this.props.groupsData.length === 0 &&
      this.props.ungroupedLinks.length === 0
  };
  handleCreateGroup = (groupName, toggleCreateGroupModal) => {    
    this.setState(state => ({
      groupsData: [
        ...state.groupsData, 
        { id: 'temporary-id', name: groupName, links: [] }
      ]
    }), () => {
      const { userId, list } = this.props;
      db.collection(`users/${userId}/lists/${list.id}/groups`).add({
        name: groupName,
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);  
        this.setState(state => ({
          groupsData: [
            ...state.groupsData.filter(groupItem => groupItem.id !== 'temporary-id'),
            { id: docRef.id, name: groupName, links: [] }
          ]
        }), () => {
          toggleCreateGroupModal(() => {
            this.setState({ isEmptyState: false });
          });
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <Header>
          <h1>{this.props.list.title} {this.props.match.url.replace(/\/app\//, '')}</h1>        
          {!this.state.isEmptyState && <AddGroup />}
        </Header>
        {!this.state.isEmptyState ? (
          <GroupsContainer>
            {this.state.groupsData.map(group => (
              <Group
                key={`Group-${group.id}`}
                listId={this.props.list.id}
                id={group.id}
                name={group.name}
                links={group.links}
                toggleModal={this.props.toggleModal}
                setSelectedGroup={this.props.setSelectedGroup}
              />
            ))}
            <Group
              key="Group-ungrouped"
              listId={this.props.list.id}
              id={null}
              name="Ungrouped"
              links={this.state.ungroupedLinks}
              toggleModal={this.props.toggleModal}
              setSelectedGroup={this.props.setSelectedGroup}
            />
          </GroupsContainer>
        ) : (
          <EmptyState 
            listId={this.props.list.id}
            toggleModal={this.props.toggleModal}
            setSelectedGroup={this.props.setSelectedGroup}
            handleCreateGroup={this.handleCreateGroup}
          />
        )}
      </React.Fragment>
    );
  }
}