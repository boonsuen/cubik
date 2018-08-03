import React from 'react';
import { Link } from 'react-static';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { auth } from '../firebase/auth';
import { db } from '../firebase/db';
import { DataContext } from './CubikApp';

import Home from '../img/icons/home.svg';
import Clock from '../img/icons/clock.svg';
import Boxes from '../img/icons/boxes.svg';
import Trash from '../img/icons/trash.svg';

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

class AddList extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addList(this.input.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-new-list">
        <input 
          type="text" 
          placeholder="Name your list" 
          ref={(el) => { this.input = el }}
          autoFocus
        />
        <div>
          <button type="submit">Add</button>
          <button className="cancel" onClick={this.props.toggleAddList} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

class Sidebar extends React.Component {
  state = {
    showAddListBtn: false,
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
      showAddList: !state.showAddList,
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
  toggleAddList = () => {
    this.setState({
      showAddList: !this.state.showAddList
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
      <div className="sidebar">
        <div className="given-lists">
          <Link to="/app">
            <img src={Home} /><span className="given-lists__text">All links</span>
          </Link>
          <Link to="/app/reading-list">
            <img src={Clock} /><span className="given-lists__text">Reading List</span>
          </Link>
          <Link to="/app">
            <img src={Boxes} /><span className="given-lists__text">Uncategorised</span>
          </Link>
          <Link to="/app">
            <img src={Trash} /><span className="given-lists__text">Trash</span>
          </Link>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="user-lists"
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
          <button type="button" onClick={this.toggleAddList}>+ New List</button>
          <Link to="/app">back</Link>
          <button onClick={this.logoutUser}>Log out</button>
        </div>
      </div>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => <Sidebar {...props} lists={data.lists} userId={data.user.id} />}
  </DataContext.Consumer>
);