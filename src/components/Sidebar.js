import React from 'react';
import { Link } from 'react-static';

import Home from '../img/Home.png';
import Read from '../img/Read.png';
import Shape from '../img/Shape.png';
import Delete from '../img/Delete.png';
import { db } from '../firebase/firebase';

class AddNewList extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('uo');
  }
  render() {
    return (
      <form className="add-new-list">
        <input type="text" placeholder="Name your list" autoFocus/>
        <div>
          <button onClick={this.handleSubmit} type="submit">Add</button>
          <button className="cancel" onClick={this.props.hideAddNewList} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default class Sidebar extends React.Component {
  state = {
    showAddNewListBtn: false
  }
  logoutUser = () => {
    firebase.auth().signOut().then(() => {
      console.log('signed out');
    });
  }
  firebaseDB = () => {
    // db.collection("users").add({
    //   first: "Alan",
    //   middle: "Mathison",
    //   last: "Turing",
    //   born: 1912
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc, doc.id, doc.data());
      });
    });
    // /users/A7JI929/
    // linklist/linkgroup/link
    //                :
  }
  addNewList = () => {
    this.setState({
      showAddNewListBtn: true
    });
  }
  hideAddNewList = () => {
    this.setState({
      showAddNewListBtn: false
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
          {this.props.lists.map((listName, index) => 
            <p key={index}><Link to={`/app/${listName.toLowerCase()}`}>{listName}</Link></p>
          )}
          {this.state.showAddNewListBtn && <AddNewList hideAddNewList={this.hideAddNewList} />}
        </div>
        <div className="sidebar__bottomOperation">
          <button type="button" onClick={this.addNewList}>+ New List</button>
          <Link to="/app">back</Link>
          <button onClick={this.logoutUser}>Log out</button>
        </div>
      </div>
    );
  }
}