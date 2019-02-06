import React from 'react';
import styled from 'styled-components';
import AddGroup from './AddGroup';
import Group from '../Group';
import EmptyState from './EmptyState';
import GroupModal from './GroupModal';
import AddLinkModal from './AddLinkModal';
import EditList from './EditList';

import db from '../../firebase/db';
import { GroupsContainer } from '../app.css';
import img_editList from '../../assets/img/icons/list/edit-list.svg';

const EditListBtn = styled.button`
  width: 28px;
  height: 26px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 4px rgba(234, 234, 234, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
`;

export default class UserListRoute extends React.Component {
  state = {    
    selectedGroup: {
      id: null,
      name: null
    },
    groupsData: this.props.groupsData,
    ungroupedLinks: this.props.ungroupedLinks,
    isEmptyState:
      this.props.groupsData.length === 0 &&
      this.props.ungroupedLinks.length === 0,
    showAddLinkModal: false,
    showRenameGroupModal: false,
    showDeleteGroupModal: false,
    inEditListMode: false
  };
  toggleAddLinkModal = () => {
    this.setState({ 
      showAddLinkModal: !this.state.showAddLinkModal 
    });
  };
  toggleRenameGroupModal = () => {
    this.setState(state => ({ 
      showRenameGroupModal: !state.showRenameGroupModal 
    }));
  };
  toggleDeleteGroupModal = () => {
    this.setState(state => ({ 
      showDeleteGroupModal: !state.showDeleteGroupModal 
    }));
  };
  setSelectedGroup = group => {
    this.setState({ selectedGroup: group });
  };
  handleAddLink = (groupId, title, url) => {
    // both url and title are required onSubmit as of now
    if (!url || !title) {
      return;
    }
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
  handleLinkDelete = link => {
    if (link.groupId) {
      const groupsData = this.state.groupsData.map(group => {
        if (group.id === link.groupId) {
          return {
            ...group,
            links: group.links.filter(groupLink => groupLink.id !== link.id)
          }
        }
        return group;
      });
      this.setState({ groupsData });
    } else {
      this.setState(state => ({
        ungroupedLinks: state.ungroupedLinks.filter(groupLink => groupLink.id !== link.id),
        isEmptyState: false
      }));
    }
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
  handleRenameGroup = newGroupName => {
    const groupId = this.state.selectedGroup.id;
    if (newGroupName === this.state.selectedGroup.name) {
      return;
    }
    const { userId, list } = this.props;
    const groupRef = db.collection(`users/${userId}/lists/${list.id}/groups`).doc(groupId);
    return groupRef.update({
      name: newGroupName
    })
    .then(() => {
      console.log("Document successfully updated!");
      this.setState(state => {
        const newGroupsData = state.groupsData.map(group => {
          if (group.id === groupId) {
            const newGroup = {...group};
            newGroup.name = newGroupName;
            return newGroup;
          } else {
            return group;
          }  
        });
        return {
          groupsData: newGroupsData,
          showRenameGroupModal: !state.showRenameGroupModal
        }
      });
    })
    .catch(err => {
      console.error("Error updating document: ", err);
    });
  }; 
  handleDeleteGroup = () => {
    const groupId = this.state.selectedGroup.id;
    const { userId, list } = this.props;

    const deleteGroup = new Promise((resolve, reject) => {
      const groupRef = db.collection(`users/${userId}/lists/${list.id}/groups`).doc(groupId);
      groupRef.delete().then(() => {
        console.log("Group successfully deleted!");
        resolve();
      }).catch(err => {
        console.error("Error removing group doc: ", err);
        reject(err);
      });
    });

    const deleteLinks = new Promise((resolve, reject) => {
      const linksRef = db.collection(`users/${userId}/lists/${list.id}/links`);
      linksRef.where('groupId', '==', groupId).get()
        .then(querySnapshot => {
          const batch = db.batch();

          querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
          });

          return batch.commit();
        }).then(() => {
          console.log('Links successfully deleted!');
          resolve();
        }).catch(err => {
          console.error("Error removing links doc: ", err);
          reject(err);
        }); 
    });

    Promise.all([deleteGroup, deleteLinks]).then(() => {
      this.setState(state => ({ 
        groupsData: state.groupsData.filter(group => group.id !== groupId) 
      }));
      this.toggleDeleteGroupModal();
    }).catch(error => { 
      console.log(error);
    });
  };
  toggleEditListMode = e => {
    this.setState(state => ({
      inEditListMode: !state.inEditListMode
    }));
  };
  render() {
    //{this.props.match.url.replace(/\/app\//, '')}
    return (!this.state.inEditListMode ? 
      (
        <React.Fragment>
          <EditListBtn onClick={this.toggleEditListMode}><img src={img_editList} /></EditListBtn>
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
                  toggleDeleteGroupModal={this.toggleDeleteGroupModal}
                  setSelectedGroup={this.setSelectedGroup}
                  handleLinkDelete={this.handleLinkDelete}
                />
              ))}
              <Group
                key="Group-ungrouped"
                listId={this.props.list.id}
                id={null}
                name="Ungrouped"
                links={this.state.ungroupedLinks}
                toggleAddLinkModal={this.toggleAddLinkModal}
                toggleDeleteGroupModal={this.toggleDeleteGroupModal}
                setSelectedGroup={this.setSelectedGroup}
                handleLinkDelete={this.handleLinkDelete}
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
            showAddLinkModal={this.state.showAddLinkModal}
            toggleAddLinkModal={this.toggleAddLinkModal}
            groupId={this.state.selectedGroup.id}
            groupName={this.state.selectedGroup.name}
            handleAddLink={this.handleAddLink}
          />
          <GroupModal 
            modalType="rename"
            isOpen={this.state.showRenameGroupModal}
            toggleModal={this.toggleRenameGroupModal}
            contentLabel="Rename group"
            onRenameGroup={this.handleRenameGroup}
            groupName={this.state.selectedGroup.name}
          />
          <GroupModal
            modalType="delete"
            isOpen={this.state.showDeleteGroupModal}
            toggleModal={this.toggleDeleteGroupModal}
            contentLabel="Delete group"
            onDeleteGroup={this.handleDeleteGroup}
            groupName={this.state.selectedGroup.name}
          />
        </React.Fragment>
      ) : (
        <EditList 
          toggleEditListMode={this.toggleEditListMode} 
          list={this.props.list}
          history={this.props.history}
        />
      )
    );
  }
}