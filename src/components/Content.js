import React from 'react';
import { Route } from 'react-static';
import Sublist from './Sublist';

import { DataContext } from './CubikApp';

class Content extends React.Component {
  state = {
    
  }
  render () {
    return (
      <div className="content">
        <h1>{this.props.currentList.title}</h1>
        <div className="links-group-column-manager">
          <Route path="/app/javascript" render={({match}) => <Sublist title={match.url} links={[]} />} />
          <Route path="/app/graphql" render={({match}) => <Sublist title={match.url} links={[]} />} />
          <Route path="/app/serverless" render={({match}) => <Sublist title={match.url} links={[]} />} />
          {this.props.currentList.sublists.map((sublist) => (
            <Sublist key={sublist.id} title={sublist.title} links={sublist.links} />
          ))}
        </div>
      </div>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => <Content {...props} currentList={data.currentList} />}
  </DataContext.Consumer>
);