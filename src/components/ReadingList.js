import React from 'react';
import Sublist from './Sublist';

import { LinksGroupContainer } from './app.css';

class ReadingList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Reading List</h1>
        <LinksGroupContainer>
          {this.props.allLinks.sublists.map((sublist) => (
            <Sublist 
              key={sublist.id} 
              title={sublist.title} 
              links={sublist.links} 
              toggleModal={this.props.toggleModal}  
            />
          ))}
        </LinksGroupContainer>
      </React.Fragment>
    );
  }
}

export default ReadingList;