import React from 'react';
import Sublist from './Sublist';

import { LinksGroupContainer } from './app.css';

class Trash extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Deleted links</h1>
        <LinksGroupContainer>
          {this.props.allLinks.sublists.map((sublist) => (
            <Sublist key={sublist.id} title={sublist.title} links={sublist.links} />
          ))}
        </LinksGroupContainer>
      </React.Fragment>
    );
  }
}

export default Trash;