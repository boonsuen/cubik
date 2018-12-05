import React from 'react';
import styled from 'styled-components';
import Group, { GroupTitle } from './Group';

import { GroupsContainer } from './app.css';
import img_addGroup from '../assets/img/icons/addgroup.svg';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
`;

const AddGroupBtn = styled.button`
  width: 142px;
  height: 48px;
  background: linear-gradient(128.71deg, #5859BF 0%, #9495F5 100%);
  box-shadow: 0 2px 15px rgba(217,138,255,0.5);
  color: #fff;
  font-weight: 500;

  img { margin: -1px 9px 0 0; }

  span { margin-top: 5px; }
`;

export default class UserListRoute extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header>
          <h1>{this.props.list.title} {this.props.match.url.replace(/\/app\//, '')}</h1>        
          <AddGroupBtn>
            <img src={img_addGroup} /><span>Add group</span>
          </AddGroupBtn>
        </Header>
        <GroupsContainer>
          {Object.keys(this.props.sublistLinks).map((item, index) => (
            <Group 
              key={`SublistLinks-${index}`} 
              title={item} 
              links={this.props.sublistLinks[item]} 
              toggleModal={this.props.toggleModal}
              setModalSublistText={this.props.setModalSublistText}
            />
          ))}
          <Group 
            key={`SublistLinks-Ungrouped`} 
            title='Ungrouped' 
            links={this.props.ungroupedLinks} 
            toggleModal={this.props.toggleModal}
            setModalSublistText={this.props.setModalSublistText}
          />
        </GroupsContainer>
      </React.Fragment>
    );
  }
}