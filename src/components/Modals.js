import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ReactModalAdapter = ({ className, ...props }) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      closeTimeoutMS={200}
      {...props}
    />
  )
};

const BaseModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    background-color: rgba(3, 53, 153, 0.1);
    z-index: 1;
  }

  .ReactModal__Content {
    opacity: 0;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
    transition: opacity 200ms;
  }

  .ReactModal__Content--before-close {
    opacity: 0;
  }
`;
 
const AddListModal = styled(BaseModal)`
  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 10px; 
    outline: none;
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    padding: 28px;
    width: 390px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(188, 196, 215, 0.5);
  }

  h2 {
    color: #204459;
    font-size: 22px;
    font-weight: 600;
  }

  input {
    line-height: 40px;
    width: 100%;
    height: 40px;
    border: 1px solid #b0b6cc;
    font-size: 16px;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    border-radius: 2px;
    transition: all 300ms;
    margin-bottom: 20px;

    &:focus {
      border-color: #889fff;
      background-color: #fcfcff;
      outline: none;
    }

    &::placeholder {
      color: #cacadb;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

const StyledAddLinkModal = styled(BaseModal)`
  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 10px; 
    outline: none; 
    padding: 28px;
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    width: 375px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(188, 196, 215, 0.5);
  }

  h2 {
    color: #204459;
    font-size: 22px;
    font-weight: 600;
  }
`;

const StyledGroupModal = styled(BaseModal)`
  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    width: 460px;
    padding: 28px; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 10px; 
    outline: none; 
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(188, 196, 215, 0.5);
  }

  h2 {
    color: #204459;
    font-size: 22px;
    font-weight: 600;
  }

  label {
    display: block;
    margin-bottom: 12px;
    color: #373764;
    font-weight: 500;
  }
`;

const StyledDeleteAccModal = styled(BaseModal)`
  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    width: 457px;
    padding: 28px; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 10px; 
    outline: none; 
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(188, 196, 215, 0.5);
  }
`;

export { 
  AddListModal, 
  StyledAddLinkModal,
  StyledGroupModal,
  StyledDeleteAccModal
};