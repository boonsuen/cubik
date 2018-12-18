import React from 'react';
import Group from './Group';

import { GroupsContainer } from './app.css';

class ReadingList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Reading List</h1>
        <GroupsContainer>
          {this.props.allLinks.groups.map(group => (
            <Group 
              key={group.id} 
              name={group.name} 
              links={group.links} 
              toggleModal={this.props.toggleModal}  
            />
          ))}
        </GroupsContainer>
      </React.Fragment>
    );
  }
}

export default ReadingList;