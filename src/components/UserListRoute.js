import React from 'react';
import styled from 'styled-components';
import Links from './Links';
import Sublist from './Sublist';

import { LinksGroupContainer } from './app.css';

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
        <LinksGroupContainer>
          {Object.keys(this.props.sublistLinks).map((item, index) => (
            <Sublist 
              key={`SublistLinks-${index}`} 
              title={item} 
              links={this.props.sublistLinks[item]} 
              toggleModal={this.props.toggleModal}
              setModalSublistText={this.props.setModalSublistText}
            />
          ))}
        </LinksGroupContainer>
      </React.Fragment>
    );
  }
}