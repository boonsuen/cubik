import React from 'react';
import LinksGroup from './LinksGroup';

export default class Content extends React.Component {
  render () {
    return (
      <div className="content">
        <h1>JavaScript</h1>
        <div className="links-group-column-manager">
          <LinksGroup title="React" />
          <LinksGroup title="Array methods" />
          <LinksGroup title="Asynchronous JS" />
          <LinksGroup title="ES6 & +" />
          <LinksGroup title="ES6 & +" />
        </div>
      </div>
    );
  }
}