import React from 'react';
import { Link } from 'react-static';

import Home from '../img/icons/home.svg';
import Clock from '../img/icons/clock.svg';
import Boxes from '../img/icons/boxes.svg';
import Trash from '../img/icons/trash.svg';
import { auth, db } from '../firebase/firebase';

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

export default class Sidebar extends React.Component {
  state = {
    showAddListBtn: false,
    lists: this.props.lists
  }
  logoutUser = () => {
    auth.signOut().then(() => {
      console.log('signed out');
      this.props.toggleAuth(false, 'done');
    });
  }
  firebaseDB = () => {
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc, doc.id, doc.data());
      });
    });
  }
  addList = (inputValue) => {
    this.setState((state) => ({
      showAddList: !state.showAddList,
      lists: [...state.lists, inputValue]
    }));
  }
  toggleAddList = () => {
    this.setState({
      showAddList: !this.state.showAddList
    });
  }
  render() {
    return (
      <div className="sidebar">
        <div className="given-lists">
          <p><img src={Home} /><span className="given-lists__text">All links</span></p>
          <p><img src={Clock} /><span className="given-lists__text">Reading List</span></p>
          <p><img src={Boxes} /><span className="given-lists__text">Uncategorised</span></p>
          <p><img src={Trash} /><span className="given-lists__text">Trash</span></p>
        </div>
        <div className="user-lists">
          {this.state.lists.map((listName, index) => 
            <p key={index}><Link to={`/app/${listName.toLowerCase()}`}>{listName}</Link></p>
          )}
          {this.state.showAddList
            && 
            <AddList 
              toggleAddList={this.toggleAddList} 
              addList={this.addList}
            />
          }
        </div>
        <div className="sidebar__bottomOperation">
          <button type="button" onClick={this.toggleAddList}>+ New List</button>
          <Link to="/app">back</Link>
          <button onClick={this.logoutUser}>Log out</button>
        </div>
      </div>
    );
  }
}