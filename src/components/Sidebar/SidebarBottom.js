import React from 'react';
import styled from 'styled-components';
import { AddListModal } from '../Modals';

import AddList_Icon from '../../assets/img/icons/AddList.svg';
import img_hideModal from '../../assets/img/icons/modal/hidemodal.svg';
import img_list from '../../assets/img/icons/modal/list.svg';

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

  div {
    margin-top: 3px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

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
  background-color: #faf7ff;
  box-shadow: 0 2px 4px rgba(235, 245, 255, 0.5);

  img {
    max-width: initial;
    margin-top: 3px;
  }
`;

const ModalDescription = styled.div`
  width: 85%;
  margin-bottom: 15px;
  color: #48546a;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const CreateListBtn = styled.button`
  align-self: flex-end;
  width: 120px;
  height: 40px;
  background: linear-gradient(232.95deg, #9277FF 0%, #7272FC 100%);  color: #fff;
  line-height: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(160, 152, 166, 0.5);
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
            <img src={AddList_Icon} alt="Add List"/>
            <div>New List</div>
          </AddListBtn>          
        </StyledSidebarBottom>
        <AddListModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Create New List Modal"
        >
          <ModalHeader>
            <Circle>
              <img src={img_list} />
            </Circle>
            <h2>New list</h2>
            <button onClick={this.toggleModal} type="button">
              <img src={img_hideModal} />
            </button>
          </ModalHeader>          
          <ModalDescription>
            Keep your links organized by adding them in a list and nested groups.
          </ModalDescription>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!this.input.value.trim()) {
              this.input.value = '';
              this.input.focus();
              return;
            };
            this.toggleModal();
            this.props.handleAddList(this.input.value.trim());
          }}>
            <input 
              placeholder="Name your list"
              ref={(el) => { this.input = el }} 
              autoFocus  
            />
            <CreateListBtn type="submit">Create list</CreateListBtn>
          </form>
        </AddListModal>
      </React.Fragment>
    );
  }
}