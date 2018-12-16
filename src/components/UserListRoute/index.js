import React from 'react';
import styled from 'styled-components';
import AddGroup from './AddGroup';
import Group, { GroupTitle } from '../Group';
import EmptyState from './EmptyState';

import { GroupsContainer } from '../app.css';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
`;

export default class UserListRoute extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header>
          <h1>{this.props.list.title} {this.props.match.url.replace(/\/app\//, '')}</h1>        
          {!this.props.isEmptyState && <AddGroup />}
        </Header>
        {!this.props.isEmptyState ? (
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
              title="Ungrouped"
              links={this.props.ungroupedLinks}
              toggleModal={this.props.toggleModal}
              setModalSublistText={this.props.setModalSublistText}
            />
          </GroupsContainer>
        ) : (
          <EmptyState />
        )}
      </React.Fragment>
    );
  }
}