import React from 'react';
import Sublist from './Sublist';

class Uncategorised extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Uncategorised links</h1>
        <div className="links-group-column-manager">
          {this.props.allLinks.sublists.map((sublist) => (
            <Sublist key={sublist.id} title={sublist.title} links={sublist.links} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Uncategorised;