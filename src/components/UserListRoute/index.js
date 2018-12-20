import React from 'react';
import styled from 'styled-components';
import AddGroup from './AddGroup';
import Group from '../Group';
import EmptyState from './EmptyState';
import { AddLinkModal } from '../Modals';

import db from '../../firebase/db';
import { GroupsContainer } from '../app.css';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
`;

const ModalGroupInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  label {
    font-weight: 500;
    color: #495f8a;
  }
  
  div {
    margin-left: 20px;
    height: 32px;
    padding: 0 10px;
    border: 1px solid #9b7ae6;
    text-align: center;
    line-height: 32px;
    border-radius: 5px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ModalInputLabel = styled.label`
  color: #71718a;
  margin-bottom: 3px;
  display: inline-block;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default class UserListRoute extends React.Component {
  state = {
    showAddLinkModal: false,
    selectedGroup: {
      listId: null,
      id: null,
      name: null
    },
    groupsData: this.props.groupsData,
    ungroupedLinks: this.props.ungroupedLinks,
    isEmptyState:
      this.props.groupsData.length === 0 &&
      this.props.ungroupedLinks.length === 0
  };
  showAddLinkModal = group => {
    this.setState({ 
      showAddLinkModal: !this.state.showAddLinkModal,
      selectedGroup: group
    });
  };
  hideAddLinkModal = () => {
    this.setState({ showAddLinkModal: !this.state.showAddLinkModal });
  };
  handleAddLink = (listId, groupId, title, url) => {
    db.collection(`users/${this.props.userId}/lists/${listId}/links`).add({
      groupId, title, url
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      const link = { groupId, title, url, id: docRef.id };
      if (link.groupId) {
        const groupsData = this.state.groupsData.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              links: [
                ...group.links,
                link
              ]
            }
          }
        });
        this.setState({ groupsData });
      } else {
        this.setState(state => ({
          ungroupedLinks: [
            ...state.ungroupedLinks,
            link
          ],
          isEmptyState: false
        }));
      }
      this.hideAddLinkModal();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  handleCreateGroup = (groupName, fromEmptyState) => {
    this.setState(state => ({
      groupsData: [
        ...state.groupsData, 
        { id: 'temporary-id', name: groupName, links: [] }
      ],
      isEmptyState: false
    }), () => {
      const { userId, list } = this.props;
      db.collection(`users/${userId}/lists/${list.id}/groups`).add({
        name: groupName
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);  
        this.setState(state => ({
          groupsData: [
            ...state.groupsData.filter(groupItem => groupItem.id !== 'temporary-id'),
            { id: docRef.id, name: groupName, links: [] }
          ]
        }));        
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
          {!this.state.isEmptyState && (
            <AddGroup handleCreateGroup={this.handleCreateGroup} />
          )}
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
                showAddLinkModal={this.showAddLinkModal}
              />
            ))}
            <Group
              key="Group-ungrouped"
              listId={this.props.list.id}
              id={null}
              name="Ungrouped"
              links={this.state.ungroupedLinks}
              showAddLinkModal={this.showAddLinkModal}
            />
          </GroupsContainer>
        ) : (
          <EmptyState 
            listId={this.props.list.id}
            showAddLinkModal={this.showAddLinkModal}
            handleCreateGroup={this.handleCreateGroup}
          />
        )}
        <AddLinkModal
          isOpen={this.state.showAddLinkModal}
          onRequestClose={this.hideAddLinkModal}
          contentLabel="Add New Link Modal"
        >
          <h2>Add link</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const { selectedGroup: { 
              listId,
              id: groupId
            } } = this.state;
            this.handleAddLink(
              listId, groupId, this.inputTitle.value, this.inputUrl.value
            );
          }}>
            <ModalGroupInfo>
              <label>Group:</label>
              <div>{this.state.selectedGroup.name}</div>
            </ModalGroupInfo>
            <ModalInputLabel htmlFor="link-url">URL</ModalInputLabel>
            <input 
              id="link-url" placeholder="https://..."
              ref={(el) => { this.inputUrl = el }} autoComplete="off"
              autoFocus  
            />
            <ModalInputLabel htmlFor="link-title">Title</ModalInputLabel>
            <input 
              id="link-title" placeholder="Enter the title (optional)"
              ref={(el) => { this.inputTitle = el }} autoComplete="off"
            />
            <ModalButtons>
              <button type="submit">Add</button>
              <button onClick={this.hideAddLinkModal} type="button">Cancel</button>
            </ModalButtons>
          </form>
        </AddLinkModal>
      </React.Fragment>
    );
  }
}