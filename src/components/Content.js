import React from 'react';
import { Route } from 'react-static';
import LinksGroup from './LinksGroup';

export default class Content extends React.Component {
  render () {
    return (
      <div className="content">
        <h1>JavaScript</h1>
        <div className="links-group-column-manager">
          <Route path="/app/javascript" render={({match}) => <LinksGroup title={match.url} />} />
          <Route path="/app/graphql" render={({match}) => <LinksGroup title={match.url} />} />
          <Route path="/app/open source" render={({match}) => <LinksGroup title={match.url} />} />
          <LinksGroup title="React" />
          <LinksGroup title="Array methods" />
          <LinksGroup title="Asynchronous JS" />
          <LinksGroup title="ES6 & +" />
        </div>
      </div>
    );
  }
}