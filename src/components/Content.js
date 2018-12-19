import React from 'react';
import { Route } from 'react-static';
import styled, { keyframes } from 'styled-components';
import AllLinks from './AllLinks';
import ReadingList from './ReadingList';
import Unsorted from './Unsorted';
import Trash from './Trash';
import { AddLinkModal } from './Modals';
import UserListRoute from './UserListRoute';

import db from '../firebase/db';
import { InitialDataContext } from './CubikApp';

const StyledContent = styled.div`
  background: #f7f8fe;
  flex: 1;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: scroll;

  h1 {
    font-size: 36px;
  }
`;

const ModalSublist = styled.div`
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

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const LoadingContent = styled.span`
  width: 35px;
  height: 35px;
  display: inline-block;
  border: 5px solid rgba(189,189,189 ,0.25);
  border-left-color: #7a97ff;
  border-top-color: #4f6cff;
  border-radius: 50%;
  animation: ${rotate} 600ms infinite linear;
`;

class ContentLoader extends React.Component {
  state = {
    loading: !this.props.fetched,
    groupsData: [],
    ungroupedLinks: []
  };
  componentDidMount() {
    const { userId, listId } = this.props;
    if (!this.props.fetched) {
      const fetchLinks = new Promise((resolve, reject) => {
        db.collection(`/users/${userId}/lists/${listId}/links`).get()
          .then(querySnapshot => {
            let links = [];
            querySnapshot.forEach((doc) => {
              links.push({...doc.data(), id: doc.id});
            });
            resolve(links);
          })
          .catch(err => console.log(err));
      });

      const fetchGroups = new Promise((resolve, reject) => {
        db.collection(`/users/${userId}/lists/${listId}/groups`).get()
          .then(querySnapshot => {
            let groups = [];
            querySnapshot.forEach((doc) => {
              groups.push({...doc.data(), id: doc.id});
            });
            resolve(groups);
          })
          .catch(err => console.log(err));
      });

      Promise.all([fetchLinks, fetchGroups]).then(values => {
        const [ links, groups ] = values;
        const groupIds = groups.reduce((acc, val, i) => {
          acc[val.id] = i;
          return acc;
        }, {});                    
        const ungroupedLinks = [];
        const groupedLinks = links.reduce((acc, val) => {
          if (groupIds.hasOwnProperty(val.groupId)) {
            acc.push(val);
          } else {
            ungroupedLinks.push(val);
          }
          return acc;
        }, []);
        let groupsDataCount = 0;
        const groupsData = groups.reduce((acc, val, i) => {
            acc.push({
              id: groups[groupsDataCount].id,
              name: groups[groupsDataCount].name,
              links: groupedLinks.filter(link => link.groupId === groups[groupsDataCount].id)
            });
            groupsDataCount += 1;
          return acc;
        }, []);
        this.setState({
          loading: false,
          groupsData,
          ungroupedLinks
        });
      });
    }
  }
  render() {
    const { groupsData, ungroupedLinks } = this.state;
    return this.state.loading 
      ? <LoadingContent /> 
      : this.props.render(groupsData, ungroupedLinks);
  }
}

class Content extends React.Component {
  state = {
    showModal: false,
    selectedGroup: {
      listId: null,
      id: null,
      name: null
    }
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  setSelectedGroup = group => {
    this.setState({
      selectedGroup: group
    });
  };
  handleAddLink = (listId, groupId, title, url) => {
    console.log(listId, groupId, title, url);
    db.collection(`users/${this.props.userId}/lists/${listId}/links`).add({
      groupId, title, url
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      const link = { groupId, title, url, id: docRef.id };
      // this.setState(prevState => ({
      //   sublistLinks: {
      //     ...prevState.sublistLinks,
      //     [sublist]: [
      //       ...prevState.sublistLinks[sublist],
      //       { id: docRef.id, sublist, title, url }
      //     ]        
      //   }
      // }), () => {
      //   this.setState((state) => ({
      //     showModal: !state.showModal,
      //   }));
      // });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  render () {
    return (
      <StyledContent>
        <Route path="/app" render={() => (
          <AllLinks 
            allLinks={this.props.allLinks} 
            lists={this.props.lists}
            toggleModal={this.toggleModal}
          />
        )} exact />
        <Route path="/app/reading-list" render={
          () => <ReadingList allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        <Route path="/app/unsorted" render={
          () => <Unsorted allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        <Route path="/app/trash" render={
          () => <Trash allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        {this.props.lists.map(list => (
          <Route 
            key={`listRoute-${list.id}`} 
            path={`/app/${list.id}`} 
            render={({match, location}) => {
              return (
                <ContentLoader 
                  location={location}
                  fetched={false}
                  listId={list.id}
                  userId={this.props.userId}
                  render={(groupsData, ungroupedLinks) => (
                    <UserListRoute
                      userId={this.props.userId}
                      groupsData={groupsData}
                      ungroupedLinks={ungroupedLinks}
                      list={list}
                      match={match}
                      toggleModal={this.toggleModal}
                      setSelectedGroup={this.setSelectedGroup}
                    />
                  )}
                />
              );
            }}  
          />
        ))}
        <AddLinkModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
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
            <ModalSublist>
              <label>Group:</label>
              <div>{this.state.selectedGroup.name}</div>
            </ModalSublist>
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
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </ModalButtons>
          </form>
        </AddLinkModal>
      </StyledContent>
    );
  }
}

export default props => (
  <InitialDataContext.Consumer>
    {data => {
      if (data.links) {
        const sublistLinks = data.links.filter(link => link.sublist);
        return (
          <Content 
            {...props} 
            userId={data.user.id}
            lists={data.lists} 
            allLinks={data.allLinks}
            ungroupedLinks={data.links.filter(link => !link.sublist)} 
            sublistLinks={sublistLinks.reduce((accumulator, currentValue, currentIndex) => {
              if (accumulator[currentValue.sublist]) {
                accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
              } else {
                accumulator[currentValue.sublist] = [];
                accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
              }
              return accumulator;
            }, {})}
          />
        );
      } else {
        return (
          <Content 
            {...props}
            userId={data.user.id} 
            lists={data.lists} 
            allLinks={data.allLinks}
          />
        );
      }
    }}
  </InitialDataContext.Consumer>
);