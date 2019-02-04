import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { StyledGroupModal } from '../Modals';

import img_hideModal from '../../assets/img/icons/modal/hidemodal.svg';
import img_create from '../../assets/img/icons/modal/group/create.svg';
import img_rename from '../../assets/img/icons/modal/group/rename.svg';
import img_delete from '../../assets/img/icons/modal/group/delete.svg';

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    margin: 0;
  }

  button {
    align-self: flex-start;
    width: 14px;
    height: 14px;
    margin-left: auto;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin-right: 13px;
  border-radius: 50%;
  background-color: ${props => props.modalType === 'delete' ? '#ffebfd' : '#f4edff'};
  box-shadow: 0 2px 4px rgba(223, 239, 255, 0.5);
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 32px;
  padding: 0 0 7px 0;
  color: #221862;
  font-family: "Avenir Next";
  font-size: 16px;
  font-weight: 400;
  outline: none;
  resize: none;
  border: none;
  border-bottom: 2px solid #dfe7ec;

  &::placeholder {
    color: #bfbfbf;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;

  button {
    width: 103px;
    height: 42px;
    color: #4a525b;
    border-radius: 5px;
    border: 1px solid #aeb2b5;
    line-height: 44px;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 2px 4px #dfefff;
    }
  }

  button:nth-of-type(2) {
    width: 115px;
    background: ${props => props.modalType === 'delete' ? '#fe5d88' : '#655efe'};
    color: #fff;
    border: none;
    margin-left: 19px;
    box-shadow: 0 2px 4px ${props => props.modalType === 'delete' ? '#f9e0ff' : '#dfefff'};
  }
`;

const DeleteDescription = styled.div`
  color: #373764;
  font-weight: 500;
`;

const GroupNameReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 35px;
  background: #dbe1ff;
  border-left: 8px solid #8f90ff;
  margin-top: 10px;
`;

const Separator = styled.div`
  height: 1px;
  margin: 15px 0;
  background-color: #dfe7ec;
`;

class GroupModal extends React.Component {
  onEnterPress = e => {
    if(e.keyCode == 13) {
      e.preventDefault();
      const { selectedGroup: {
        id: groupId
      } } = this.state;
      this.handleRenameGroup(
        groupId, this.groupNameTextarea.value.trim().replace(/\n/g, "")
      );
    }
  }; 
  render() {
    const { modalType, isOpen, toggleModal, contentLabel, groupName } = this.props;
    return (
      <StyledGroupModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel={contentLabel}
      >
        <Header>
          <Circle modalType={modalType}>
            {modalType === 'create' && <img src={img_create} />}
            {modalType === 'rename' && <img src={img_rename} />}
            {modalType === 'delete' && <img src={img_delete} />}
          </Circle>
          {modalType === 'create' && <h2>Create new group</h2>}
          {modalType === 'rename' && <h2>Change group name</h2>}
          {modalType === 'delete' && <h2>Delete the group?</h2>}
          <button onClick={toggleModal} type="button">
            <img src={img_hideModal} />
          </button>
        </Header>  
        {(modalType === 'create' || modalType === 'rename') && 
          <form onSubmit={(e) => {
            e.preventDefault();
            const groupName = this.groupNameTextarea.value.trim();
            if (modalType === 'create' && !groupName) {
              this.groupNameTextarea.value = '';
              this.groupNameTextarea.focus();
              return;
            }
            this.props.onSubmit(groupName);
          }}>
            <label htmlFor="GroupNameTextarea">Name</label>
            <StyledTextarea 
              id="GroupNameTextarea"
              placeholder="Enter a name"
              inputRef={tag => this.groupNameTextarea = tag}
              maxRows={3}
              defaultValue={groupName}
              spellCheck={false}
              onKeyDown={this.onEnterPress}
              autoFocus
            />
            <BtnContainer>
              <button onClick={toggleModal} type="button">Cancel</button>
              <button type="submit">
                {modalType === 'create' && "Create"}
                {modalType === 'rename' && "Submitted"}
                {modalType === 'delete' && "Delete"}
              </button> 
            </BtnContainer>
          </form>
        }
        {modalType === 'delete' &&
          <form onSubmit={e => {
            e.preventDefault();
          }}>
            <DeleteDescription>Are you sure to delete this group?</DeleteDescription>
            <GroupNameReminder>GraphQL</GroupNameReminder>
            <Separator />
            <DeleteDescription>13 links under it will be gone forever along with it.</DeleteDescription>
            <BtnContainer modalType="delete">
              <button onClick={toggleModal} type="button">Cancel</button>
              <button type="submit">Delete</button> 
            </BtnContainer>
          </form>
        }
      </StyledGroupModal>
    );
  }
}

export default GroupModal;