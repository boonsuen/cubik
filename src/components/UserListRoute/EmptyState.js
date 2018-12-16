import React from 'react';
import styled from 'styled-components';
import { AddLinkModal as CreateGroupModal } from '../Modals';

import img_emptyState from '../../assets/img/illustration/emptystate.svg';

const Container = styled.div`
  box-sizing: border-box;
  width: 427px;
  padding: 32px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 7px #ecedff;

  h2 {
    margin: 14px 0 0 0;
    color: #606097;
  }

  p {
    margin: 8px 0 22px 0;
    color: #797999;
  }
`;

const AddLinkBtn = styled.button`
  display: inline-block;
  width: 115px;
  height: 49px;
  background-color: #d7d4ff;
  border-radius: 5px;
  color: #200066;
  font-weight: 600;
`;

const CreateGroupBtn = styled(AddLinkBtn)`
  width: 159px;
  background-color: #d9e9ff;
`;

const Or = styled.span`
  margin: 0 16px;
  color: #002a70;
  font-size: 20px;
  font-weight: 700;
`;

const ModalInputLabel = styled.label`
  color: #71718a;
  margin-bottom: 3px;
  display: inline-block;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class EmptyState extends React.Component {
  state = {
    showModal: false
  };
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  handleCreateGroup = (groupName) => {
    console.log(groupName);
  };
  render() {
    return (
      <Container>
        <img src={img_emptyState} />
        <h2>What will you save?</h2>
        <p>You don't have any links here yet.</p>
        <AddLinkBtn
          type="button"
          onClick={() => {
            this.props.toggleModal();
            this.props.setModalSublistText('Ungrouped');
          }}
        >
          Add a link
        </AddLinkBtn>
        <Or>or</Or>
        <CreateGroupBtn 
          type="button"
          onClick={() => {
            this.toggleModal();
          }}
        >
          Create a group
        </CreateGroupBtn>
        <CreateGroupModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Create new group modal"
        >
          <h2>Create new group</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleCreateGroup(this.inputName.value);
          }}>
            <ModalInputLabel htmlFor="group-name">Name</ModalInputLabel>
            <input 
              id="group-name" placeholder="Enter a name"
              ref={(el) => { this.inputName = el }} autoComplete="off"
              autoFocus  
            />
            <ModalButtons>
              <button type="submit">Create</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </ModalButtons>
          </form>
        </CreateGroupModal>
      </Container>
    );
  }
}

export default EmptyState;