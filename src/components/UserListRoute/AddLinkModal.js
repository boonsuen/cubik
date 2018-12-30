import React from 'react';
import styled from 'styled-components';
import { StyledAddLinkModal } from '../Modals';

import img_hideModal from '../../assets/img/icons/modal/hidemodal.svg';
import img_link from '../../assets/img/icons/modal/link.svg';
import img_plus from '../../assets/img/icons/modal/plus.svg';

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

const ModalCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin-right: 13px;
  border-radius: 50%;
  background-color: #faebff;
  box-shadow: 0 2px 4px rgba(223, 239, 255, 0.5);
`;

const ModalGroupInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  label {
    font-weight: 500;
    color: #495f8a;
  }
  
  div {
    margin-left: 15px;
    height: 32px;
    padding: 0 10px;
    border: 1px solid #9b7ae6;
    text-align: center;
    line-height: 32px;
    border-radius: 5px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ModalInputLabel = styled.label`
  color: #71718a;
  margin-bottom: 3px;
  display: inline-block;
`;

const FetchTitleBtn = styled.button`
  display: inline-block;
  height: initial;
  margin-left: 4px;
  color: #5da4f4;
  transition: color 0.25s;

  &:hover, &:focus {
    color: #247ee6;
  }
`;

const ModalBtnCtn = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    width: 86px;
    height: 40px;
    background: linear-gradient(223.7deg, #F199FF 0%, #BE6BFF 100%);
    color: #fff;
    line-height: 45px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 #DFEFFF;
  }

  img {
    margin: -5px 6px 0 0;
  }
`;

class AddLinkModal extends React.Component {
  render() {
    const { 
      showAddLinkModal, 
      toggleAddLinkModal,
      groupId,
      groupName,
      handleAddLink
    } = this.props;
    return (
      <StyledAddLinkModal
        isOpen={showAddLinkModal}
        onRequestClose={toggleAddLinkModal}
        contentLabel="Add Link Modal"
      >
        <ModalHeader>
          <ModalCircle>
            <img src={img_link} />
          </ModalCircle>
          <h2>Add link</h2>
          <button onClick={toggleAddLinkModal} type="button">
            <img src={img_hideModal} />
          </button>
        </ModalHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddLink(
            groupId, 
            this.inputTitle.value.trim(), 
            this.inputUrl.value.trim()
          );
        }}>
          <ModalGroupInfo>
            <label>Group:</label>
            <div>{groupName}</div>
          </ModalGroupInfo>
          <ModalInputLabel htmlFor="link-url">URL</ModalInputLabel>
          <input 
            id="link-url" placeholder="https://..."
            ref={(el) => { this.inputUrl = el }} autoComplete="off"
            autoFocus required
          />
          <ModalInputLabel htmlFor="link-title">Title - </ModalInputLabel>
          <FetchTitleBtn type="button">Get title from link</FetchTitleBtn>
          <input 
            id="link-title" placeholder="Enter the title (optional)"
            ref={(el) => { this.inputTitle = el }} autoComplete="off"
          />
          <ModalBtnCtn>
            <button type="submit">
              <img src={img_plus} />Add
            </button>
          </ModalBtnCtn>
        </form>
      </StyledAddLinkModal>
    );
  }
}

export default AddLinkModal;