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
            {this.props.groupsData.map((group, index) => (
              <Group
                key={`Group-${group.id}`}
                name={group.name}
                links={group.links}
                toggleModal={this.props.toggleModal}
                setModalSublistText={this.props.setModalSublistText}
              />
            ))}
            <Group
              key={`Group-ungrouped`}
              name="Ungrouped"
              links={this.props.ungroupedLinks}
              toggleModal={this.props.toggleModal}
              setModalSublistText={this.props.setModalSublistText}
            />
          </GroupsContainer>
        ) : (
          <EmptyState 
            toggleModal={this.props.toggleModal}
            setModalSublistText={this.props.setModalSublistText}
          />
        )}
      </React.Fragment>
    );
  }
}