import React from 'react';
import { Route } from 'react-static';
import styled from 'styled-components';
import Sublist from './Sublist';
import AllLinks from './AllLinks';
import ReadingList from './ReadingList';
import Uncategorised from './Uncategorised';
import Trash from './Trash';
import Links from './Links';

import { DataContext } from './CubikApp';
import { LinksGroupContainer } from './app.css';

const StyledContent = styled.div`
  background: #f7f8fe;
  flex: 1;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: scroll;
`;

class Content extends React.Component {
  render () {
    return (
      <StyledContent>
        <Route path="/app" render={() => <AllLinks allLinks={this.props.allLinks} />} exact />
        <Route path="/app/reading-list" render={() => <ReadingList allLinks={this.props.allLinks} exact />} />    
        <Route path="/app/uncategorised" render={() => <Uncategorised allLinks={this.props.allLinks} exact />} />    
        <Route path="/app/trash" render={() => <Trash allLinks={this.props.allLinks} exact />} />    
        {this.props.lists.map((list) => (
          <Route key={`listRoute-${list.id}`} path={`/app/${list.id}`} render={({match}) => (
            <React.Fragment>
              <h1>{list.title} {match.url.replace(/\/app\//, '')}</h1>
              <Links links={this.props.ungrouppedLinks} />              
              <LinksGroupContainer>
                {Object.keys(this.props.sublistLinks).map((item, index) => (                
                  <Sublist 
                    key={`SublistLinks-${index}`} 
                    title={item} 
                    links={this.props.sublistLinks[item]} 
                  />
                ))}
              </LinksGroupContainer>
            </React.Fragment>
          )} />
        ))}
      </StyledContent>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => {
      if (data.links) {
        const sublistLinks = data.links.filter(link => link.sublist);
        return <Content 
          {...props} 
          lists={data.lists} 
          allLinks={data.allLinks}
          ungrouppedLinks={data.links.filter(link => !link.sublist)} 
          sublistLinks={sublistLinks.reduce((accumulator, currentValue, currentIndex) => {
            if (accumulator[currentValue.sublist]) {
              accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
            } else {
              accumulator[currentValue.sublist] = [];
              accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
            }
            return accumulator;
          }, {})}
        />
      } else {
        return <Content 
          {...props} 
          lists={data.lists} 
          allLinks={data.allLinks}
        />
      }
    }}
  </DataContext.Consumer>
);