import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import AddGroup from './AddGroup';
import Group from '../Group';
import EmptyState from './EmptyState';
import { AddLinkModal, RenameGroupModal } from '../Modals';

import db from '../../firebase/db';
import { GroupsContainer } from '../app.css';
import img_hideModal from '../../assets/img/icons/hidemodal.svg';
import img_rename from '../../assets/img/icons/rename.svg';

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

const GroupModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    margin: 0;
  }

  button {
    align-self: flex-start;
    width: 14px;
    height: 14px;
    margin-left: auto;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin-right: 13px;
  border-radius: 50%;
  background-color: #f4edff;
  box-shadow: 0 2px 4px rgba(223, 239, 255, 0.5);
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 32px;
  padding: 0 0 7px 0;
  color: #221862;
  font-family: "Avenir Next";
  font-size: 16px;
  font-weight: 400;
  outline: none;
  resize: none;
  border: none;
  border-bottom: 2px solid #dfe7ec;
`;

const GroupModalBtnCtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;

  button {
    width: 103px;
    height: 42px;
    color: #4a525b;
    border-radius: 5px;
    border: 1px solid #aeb2b5;
    line-height: 44px;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 2px 4px #dfefff;
    }
  }

  button:nth-of-type(2) {
    width: 120px;
    background: #655efe;
    color: #fff;
    border: none;
    margin-left: 19px;
    box-shadow: 0 2px 4px #dfefff;
  }
`;

export default class UserListRoute extends React.Component {
  state = {
    showAddLinkModal: false,
    selectedGroup: {
      id: null,
      name: null
    },
    groupsData: this.props.groupsData,
    ungroupedLinks: this.props.ungroupedLinks,
    isEmptyState:
      this.props.groupsData.length === 0 &&
      this.props.ungroupedLinks.length === 0,
    showRenameGroupModal: false
  };
  toggleAddLinkModal = () => {
    this.setState({ 
      showAddLinkModal: !this.state.showAddLinkModal 
    });
  };
  toggleRenameGroupModal = () => {
    this.setState({ 
      showRenameGroupModal: !this.state.showRenameGroupModal 
    });
  };
  setSelectedGroup = group => {
    this.setState({ selectedGroup: group });
  };
  handleAddLink = (groupId, title, url) => {
    const { userId, list } = this.props;
    db.collection(`users/${userId}/lists/${list.id}/links`).add({
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
          return group;
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
      this.toggleAddLinkModal();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  handleCreateGroup = (groupName, fromEmptyState) => {
    const { userId, list } = this.props;
    const addToDb = db.collection(`users/${userId}/lists/${list.id}/groups`).add({
      name: groupName
    }).catch(error => {
      console.error("Error adding group doc: ", error);
    });
    
    if (fromEmptyState) {
      this.setState(state => ({
        groupsData: [
          ...state.groupsData, 
          { id: 'temporary-id', name: groupName, links: [] }
        ],
        isEmptyState: false
      }), () => {
        addToDb.then(docRef => {
          console.log("Document written with ID: ", docRef.id);  
          this.setState(state => ({
            groupsData: [
              ...state.groupsData.filter(groupItem => groupItem.id !== 'temporary-id'),
              { id: docRef.id, name: groupName, links: [] }
            ]
          }));
        });        
      });
    } else {
      return addToDb.then(docRef => {
        console.log("Document written with ID: ", docRef.id);  
        this.setState(state => ({
          groupsData: [
            ...state.groupsData,
            { id: docRef.id, name: groupName, links: [] }
          ]
        }));
      });
    }
  };
  handleRenameGroup = (groupId, newGroupName) => {
    if (newGroupName === this.state.selectedGroup.name) {
      console.log('No name changes');
      return;
    }
    const { userId, list } = this.props;
    const groupRef = db.collection(`users/${userId}/lists/${list.id}/groups`).doc(groupId);
    return groupRef.update({
      name: newGroupName
    })
    .then(() => {
      console.log("Document successfully updated!");
      this.toggleRenameGroupModal();
    })
    .catch(err => {
      console.error("Error updating document: ", err);
    });
  };
  render() {
    //{this.props.match.url.replace(/\/app\//, '')}
    return (
      <React.Fragment>
        <Header>
          <h1>{this.props.list.title}</h1>        
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
                toggleAddLinkModal={this.toggleAddLinkModal}
                toggleRenameGroupModal={this.toggleRenameGroupModal}
                setSelectedGroup={this.setSelectedGroup}
              />
            ))}
            <Group
              key="Group-ungrouped"
              listId={this.props.list.id}
              id={null}
              name="Ungrouped"
              links={this.state.ungroupedLinks}
              toggleAddLinkModal={this.toggleAddLinkModal}
              setSelectedGroup={this.setSelectedGroup}
            />
          </GroupsContainer>
        ) : (
          <EmptyState 
            listId={this.props.list.id}
            toggleAddLinkModal={this.toggleAddLinkModal}
            setSelectedGroup={this.setSelectedGroup}
            handleCreateGroup={this.handleCreateGroup}
          />
        )}
        <AddLinkModal
          isOpen={this.state.showAddLinkModal}
          onRequestClose={this.toggleAddLinkModal}
          contentLabel="Add New Link Modal"
        >
          <h2>Add link</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const { selectedGroup: { 
              id: groupId
            } } = this.state;
            this.handleAddLink(
              groupId, this.inputTitle.value, this.inputUrl.value
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
              <button onClick={this.toggleAddLinkModal} type="button">Cancel</button>
            </ModalButtons>
          </form>
        </AddLinkModal>
        <RenameGroupModal
          isOpen={this.state.showRenameGroupModal}
          onRequestClose={this.toggleRenameGroupModal}
          contentLabel="Rename Group Modal"
        >          
          <GroupModalHeader>
            <Circle>
              <img src={img_rename} />
            </Circle>
            <h2>Change group name</h2>
            <button onClick={this.toggleRenameGroupModal} type="button">
              <img src={img_hideModal} />
            </button>
          </GroupModalHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const { selectedGroup: {
              id: groupId
            } } = this.state;
            this.handleRenameGroup(
              groupId, this.groupNameTextarea.value.trim()
            );
          }}>
            <label htmlFor="GroupNameTextarea">Name</label>
            <StyledTextarea 
              id="GroupNameTextarea"
              inputRef={tag => this.groupNameTextarea = tag}
              maxRows={3}
              defaultValue={this.state.selectedGroup.name}
              required
            />
            <GroupModalBtnCtn>
              <button onClick={this.toggleRenameGroupModal} type="button">Cancel</button>
              <button type="submit">Submit</button> 
            </GroupModalBtnCtn>
          </form>
        </RenameGroupModal>
      </React.Fragment>
    );
  }
}