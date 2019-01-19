import React from 'react';
import Group from './Group';

import { GroupsContainer } from './app.css';

class Trash extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Deleted links</h1>
        <div>This functionality is not ready yet.</div>
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

export default Trash;