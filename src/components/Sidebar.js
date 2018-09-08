import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AddListModal } from './Modals';

import auth from '../firebase/auth';
import db from '../firebase/db';
import { DataContext } from './CubikApp';

import Home from '../img/icons/home.svg';
import Clock from '../img/icons/clock.svg';
import Boxes from '../img/icons/boxes.svg';
import Trash from '../img/icons/trash.svg';

const StyledSidebar = styled.div`
  width: 259px;
  box-shadow: 5px 0 5px rgba(235, 233, 255, 50%);
  z-index: 1;  
  display: flex;
  flex-direction: column;
`;

const SidebarUpper = styled.div`
  padding: 20px 29px 0 29px;
  box-sizing: border-box;
  overflow: scroll;
`;

const GivenLists = styled.div`
  color: #56578c;
  font-weight: 500;
  border-bottom: 1px solid #e6e9ec;

  a {
    margin: 9px 0 9px 0;
    display: flex;
    align-items: center;
    color: #56578c;
  }

  img {
    margin-right: 10px;
    width: 20px;
  }
`;

const GivenListsText = styled.span`
  margin-top: 5px;
  display: inline-block;
`;

const UserLists = styled.div`
  margin-top: 10px;

  a {
    color: #8080a2;
    display: block;
    padding: 8px 0 8px 0;
  }

  a.active {
    color: #262660;
    position: relative;
  }

  .active::before {
    background: #6067f1;
    position: absolute;
    width: 2px;
    height: 19px;
    display: block;
  }
`;

const SidebarBottom = styled.div`
  margin-top: auto;
  box-sizing: border-box;
  border-top: 1px solid #eceef2;
  padding: 0 29px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const NewListBtn = styled.button`
  color: #8181b7;
  font-weight: 500;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging && '#efffef',
  margin: '0',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver && '#ffefef',
});

class Sidebar extends React.Component {
  state = {
    showModal: false,
    lists: this.props.lists
  }
  componentDidUpdate() {
    console.log('siderbar updated');
  }
  logoutUser = () => {
    auth.signOut().then(() => {
      console.log('signed out');
      this.props.toggleAuth(false, 'done');
    });
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  handleAddList = (inputValue) => {
    if (!inputValue) return;
    this.setState((state) => ({
      showModal: !state.showModal,
      lists: [...state.lists, {title: inputValue, id: 'temporary-id'}]
    }), () => {
      db.collection(`users/${this.props.userId}/lists`).add({
        title: inputValue,
        order: this.state.lists.length - 1,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState((state) => {
          return {
            lists: [
              ...state.lists.filter(list => list.id !== 'temporary-id'),
              {title: inputValue, id: docRef.id}
            ]
          }
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    });
  }  
  onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    const lists = reorder(
      this.state.lists,
      result.source.index,
      result.destination.index
    );

    this.setState({
      lists,
    });
  }
  render() {
    return (
      <StyledSidebar>
        <SidebarUpper>
          <GivenLists>
            <Link to="/app">
              <img src={Home} alt="Home" />
              <GivenListsText>All links</GivenListsText>
            </Link>
            <Link to="/app/reading-list">
              <img src={Clock} alt="Reading List" />
              <GivenListsText>Reading List</GivenListsText>
            </Link>
            <Link to="/app/uncategorised">
              <img src={Boxes} alt="Uncategorized" />
              <GivenListsText>Uncategorised</GivenListsText>
            </Link>
            <Link to="/app/trash">
              <img src={Trash} alt="Trash" />
              <GivenListsText>Trash</GivenListsText>
            </Link>
          </GivenLists>  
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <UserLists>
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.lists.map((list, index) => (
                      <Draggable key={`listTitle-${list.id}`} draggableId={list.id} index={index}>
                        {(provided, snapshot) => (
                          <p
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          ><Link to={`/app/${list.id}`}>{list.title}</Link></p>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </UserLists>
              )}
            </Droppable>
          </DragDropContext>
        </SidebarUpper>
        <Link to="/app">back</Link>
        <button onClick={this.logoutUser}>Log out</button>
        <SidebarBottom>
          <NewListBtn type="button" onClick={this.toggleModal}>+ New List</NewListBtn>          
        </SidebarBottom>
        <AddListModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Create New List Modal"
        >
          <h2>Create new list</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleAddList(this.input.value);
          }}>
            <input 
              placeholder="Name your list"
              ref={(el) => { this.input = el }} 
              autoFocus  
            />
            <div>
              <button type="submit">Add</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </div>
          </form>
        </AddListModal>
      </StyledSidebar>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => <Sidebar {...props} lists={data.lists} userId={data.user.id} />}
  </DataContext.Consumer>
);