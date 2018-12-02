import React from 'react';
import Group from './Group';

import { GroupsContainer } from './app.css';

class Unsorted extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Unsorted links</h1>
        <GroupsContainer>
          {this.props.allLinks.sublists.map((sublist) => (
            <Group 
              key={sublist.id} 
              title={sublist.title} 
              links={sublist.links} 
              toggleModal={this.props.toggleModal}  
            />
          ))}
        </GroupsContainer>
      </React.Fragment>
    );
  }
}

export default Unsorted;