import React from 'react';
import Sublist from './Sublist';

class AllLinks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>All Links</h1>
        <div className="links-group-column-manager">
          {this.props.allLinks.sublists.map((sublist) => (
            <Sublist key={sublist.id} title={sublist.title} links={sublist.links} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default AllLinks;