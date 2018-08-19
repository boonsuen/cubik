import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StyledModal from './ReactModal';

import auth from '../firebase/auth';
import db from '../firebase/db';
import { DataContext } from './CubikApp';

import Home from '../img/icons/home.svg';
import Clock from '../img/icons/clock.svg';
import Boxes from '../img/icons/boxes.svg';
import Trash from '../img/icons/trash.svg';

const AddListForm = styled.form`
  input {
    height: 35px;
    width: 100%;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 2px;
    border: 1px solid #c4c8d7;
    transition: all 300ms;
  }

  input:focus {
    border-color: #889fff;
    background-color: #fcfcff;
    outline: none;
  }

  button {
    color: #fff;
    height: 35px;
    font-size: 14px;
    border-radius: 2px;
    padding: 0px 15px 0px 15px;
    background: #7272fc;
    display: inline-block;
    margin-right: 10px;
  }

  button.cancel {
    background: #e5e5ff;
    color: #6e6e99;
  }
`;

const StyledSidebar = styled.div`
  width: 259px;
  box-shadow: 5px 0 5px rgba(235, 233, 255, 50%);
  z-index: 1;
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

// class AddList extends React.Component {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.addList(this.input.value);
//   }
//   render() {
//     return (
//       <AddListForm onSubmit={this.handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="Name your list" 
//           ref={(el) => { this.input = el }}
//           autoFocus
//         />
//         <div>
//           <button type="submit">Add</button>
//           <button className="cancel" onClick={this.props.toggleAddList} type="button">Cancel</button>
//         </div>
//       </AddListForm>
//     );
//   }
// }

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
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
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
        {this.state.showAddList
          && 
          <AddList 
            toggleAddList={this.toggleAddList} 
            addList={this.handleAddList}
          />
        }
        <div className="sidebar__bottomOperation">
          <button type="button" onClick={this.toggleModal}>+ New List</button>
          <Link to="/app">back</Link>
          <button onClick={this.logoutUser}>Log out</button>
        </div>
        <StyledModal
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
        </StyledModal>
      </StyledSidebar>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => <Sidebar {...props} lists={data.lists} userId={data.user.id} />}
  </DataContext.Consumer>
);