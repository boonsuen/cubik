import React from 'react';
import Links from './Links';

export default class Sublist extends React.Component {
  render() {
    return (
      <div className="links-group">
        <h2 className="links-group__title">{this.props.title}</h2>
        <Links links={[...this.props.links].reverse()} />
      </div>
    );
  }
}