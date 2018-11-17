import React from 'react';
import styled from 'styled-components';
import { AddListModal } from '../Modals';

import AddList_Icon from '../../assets/img/icons/AddList.svg';

const StyledSidebarBottom = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #eceef2;
  padding: 0 29px;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
`;

const AddListBtn = styled.button`
  color: #65659d;
  font-weight: 500;

  img {
    margin-right: 8px;
  }
`;

export default class SidebarBottom extends React.Component {
  state = {
    showModal: false
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  render() {
    return (
      <React.Fragment>
        <StyledSidebarBottom>
          <AddListBtn 
            type="button" 
            onClick={this.toggleModal}
          >
            <img src={AddList_Icon} alt="Add List"/> New List
          </AddListBtn>          
        </StyledSidebarBottom>
        <AddListModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Create New List Modal"
        >
          <h2>Create new list</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.toggleModal();
            this.props.handleAddList(this.input.value);
          }}>
            <input 
              placeholder="Name your list"
              ref={(el) => { this.input = el }} 
              autoFocus  
            />
            <div>
              <button type="submit">Add</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </div>
          </form>
        </AddListModal>
      </React.Fragment>
    );
  }
}