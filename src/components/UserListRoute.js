import React from 'react';
import Links from './Links';
import Group from './Group';

import { GroupsContainer } from './app.css';

export default class UserListRoute extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>{this.props.list.title} {this.props.match.url.replace(/\/app\//, '')}</h1>
        <Links 
          links={this.props.ungroupedLinks} 
          toggleModal={this.props.toggleModal} 
          setModalSublistText={this.props.setModalSublistText}  
        />
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
        </GroupsContainer>
      </React.Fragment>
    );
  }
}