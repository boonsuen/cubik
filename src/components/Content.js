import React from 'react';
import { Route } from 'react-static';
import Sublist from './Sublist';
import AllLinks from './AllLinks';

import { DataContext } from './CubikApp';

class Content extends React.Component {
  render () {
    return (
      <div className="content">
        <Route path="/app" render={() => <AllLinks currentList={this.props.currentList} />} exact />
        {this.props.lists.map((list) => (
          <Route key={`listRoute-${list.id}`} path={`/app/${list.id}`} render={({match}) => (
            <React.Fragment>
              <h1>{list.title} {match.url.replace(/\/app\//, '')}</h1>
              <div className="links-group-column-manager">
                {this.props.currentList.sublists.map((sublist) => (
                  <Sublist key={sublist.id} title={sublist.title} links={sublist.links} />
                ))}
              </div>
            </React.Fragment>
          )} />
        ))}
      </div>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => <Content {...props} lists={data.lists} currentList={data.currentList} />}
  </DataContext.Consumer>
);