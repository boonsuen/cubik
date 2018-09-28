import React from 'react';
import styled from 'styled-components';
import ListCard from './ListCard';
import Sublist from './Sublist';

import { LinksGroupContainer } from './app.css';

const TabButton = styled.button`
  display: inline-block;
  height: 48px;
  background: ${props => props.primary ? '#5c87ff' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#5c87ff'};
  font-size: 18px;
  font-weight: 500;
  padding: 0 18px;
  border-radius: 5px;
  margin-right: 22px;
  box-shadow: ${props => props.primary && '0 1px 5px #c8afff'};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 60px;
  position: relative;
  z-index: 0;
`;

class AllLinks extends React.Component {
  state = {
    activeTab: 'overview'
  }
  handleTabSwitch = () => {
    console.log('handle');
    this.setState((prevState) => ({
      activeTab: prevState.activeTab === 'overview' ? 'alllinks' : 'overview'
    }));
  }
  render() {
    return (
      <React.Fragment>
        <h1>Your links</h1>
        <TabButton 
          onClick={this.handleTabSwitch} type="button" 
          primary={this.state.activeTab === 'overview'}>Overview
        </TabButton>
        <TabButton 
          onClick={this.handleTabSwitch} type="button"
          primary={this.state.activeTab === 'alllinks'}>All links
        </TabButton>
        <CardContainer>
          <ListCard title="JavaScript" />
          <ListCard title="GraphQL" />
          <ListCard title="Serverless" />
          <ListCard title="Learning Materials" />
        </CardContainer>
    
        <LinksGroupContainer>
          {this.props.allLinks.sublists.map((sublist) => (
            <Sublist 
              key={sublist.id} 
              title={sublist.title} 
              links={sublist.links} 
              toggleModal={this.props.toggleModal}  
            />
          ))}
        </LinksGroupContainer>
      </React.Fragment>
    );
  }
}

export default AllLinks;