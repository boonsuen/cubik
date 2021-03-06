import React from 'react';
import styled from 'styled-components';
import CreateGroupModal from './GroupModal';

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
    showCreateGroupModal: false
  };
  toggleCreateGroupModal = () => {
    this.setState({
      showCreateGroupModal: !this.state.showCreateGroupModal
    });
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
            this.props.toggleAddLinkModal();
            this.props.setSelectedGroup({
              id: null,
              name: 'Ungrouped'
            });
          }}
        >
          Add a link
        </AddLinkBtn>
        <Or>or</Or>
        <CreateGroupBtn 
          type="button"
          onClick={this.toggleCreateGroupModal}
        >
          Create a group
        </CreateGroupBtn>
        <CreateGroupModal
          modalType="create"
          isOpen={this.state.showCreateGroupModal}
          toggleModal={this.toggleCreateGroupModal}
          contentLabel="Create new group"
          onCreateGroup={this.props.handleCreateGroup}
        />
      </Container>
    );
  }
}

export default EmptyState;