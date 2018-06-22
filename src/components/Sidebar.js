import React from 'react';
import { Link } from 'react-static';

import Home from '../img/Home.png';
import Read from '../img/Read.png';
import Shape from '../img/Shape.png';
import Delete from '../img/Delete.png';

export default class Sidebar extends React.Component {
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
          <p className="active">JavaScript</p>
          <p>GitHub</p>
          <p>GraphQL</p>
        </div>
        <div className="sidebar__bottomOperation">
          <button type="button">+ New List</button>
          <Link to="/">back</Link>
        </div>
      </div>
    )
  }
}