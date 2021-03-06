import React from 'react';
import styled from 'styled-components';
import ListCard from './ListCard';
import Group from './Group';

import { GroupsContainer } from './app.css';

const TabButton = styled.button`
  display: inline-block;
  height: 48px;
  background: ${props => props.primary ? '#5c87ff' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#5c87ff'};
  font-size: 18px;
  font-weight: 600;
  padding: 0 18px;
  border-radius: 5px;
  margin-right: 22px;
  box-shadow: ${props => props.primary && '0 1px 5px #c8afff'};
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  justify-content: space-between;
  margin-top: 60px;
  position: relative;
  z-index: 0;
`;

class AllLinks extends React.Component {
  state = {
    activeTab: 'overview'
  }
  handleTabSwitch = () => {
    this.setState((prevState) => ({
      activeTab: prevState.activeTab === 'overview' ? 'alllinks' : 'overview'
    }));
  }
  render() {
    const colors = ['#c2c4ff', '#a5bdfd', '#cec2ff', '#d9f2ff', '#eed6ff'];
    const newListsArr = this.props.lists.map((list, i) => ({
      ...list, 
      bgColor: colors[i]
    }));

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
        <CardsContainer>
          {newListsArr.map(list => 
            <ListCard 
              id={list.id} 
              title={list.title} 
              bgColor={list.bgColor} 
              key={`ListCard-${list.id}`} 
            />
          )}
          {/* <ListCard title="JavaScript" />
          <ListCard title="GraphQL" bgColor="#a5bdfd" />
          <ListCard title="Serverless" bgColor="#cec2ff" />
          <ListCard title="Learning Materials" bgColor="#d9f2ff" />
          <ListCard title="Web Performance & Optimization" bgColor="#eed6ff" /> */}
        </CardsContainer>
    
        <GroupsContainer>
          {this.props.allLinks.groups.map(group => (
            <Group 
              key={group.id} 
              name={group.name} 
              links={group.links} 
              toggleModal={this.props.toggleModal}  
            />
          ))}
        </GroupsContainer>
      </React.Fragment>      
    );
  }
}

export default AllLinks;