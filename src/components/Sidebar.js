import React from 'react';
import { Link } from 'react-static';

import Home from '../img/Home.png';
import Read from '../img/Read.png';
import Shape from '../img/Shape.png';
import Delete from '../img/Delete.png';
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
          <p><img src={Home} />All links</p>
          <p><img src={Read} />Reading List</p>
          <p><img src={Shape} />Uncategorised</p>
          <p><img src={Delete} />Trash</p>
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