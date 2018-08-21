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
      {...props}
    />
  )
};
 
const AddListModal = styled(ReactModalAdapter)`

  &__overlay {
    position: fixed; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    background-color: rgba(3, 53, 153, 0.1);
    z-index: 1;
  }

  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 4px; 
    outline: none; 
    padding: 20px; 
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    padding: 32px;
    width: 326px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px #adb4c4;
  }

  h2 {
    font-size: 25px;
    margin-top: 0;
  }

  input {
    line-height: 40px;
    width: 100%;
    height: 40px;
    border: 1px solid #c4c8d7;
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
      color: #d4d4df;
    }
  }

  form div {
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 150px;
    height: 40px;
    background: #7272fc;
    color: #fff;
    line-height: 40px;
    border-radius: 2px;
  }

  div button:nth-child(2) {
    width: 101px;
    background: #e5e5ff;
    color: #102d3e;
  }
`;

const AddLinkModal = styled(ReactModalAdapter)`

  &__overlay {
    position: fixed; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    background-color: rgba(3, 53, 153, 0.1);
    z-index: 1;
  }

  &__content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    right: auto; 
    bottom: auto; 
    background: rgb(255, 255, 255); 
    overflow: auto; 
    border-radius: 4px; 
    outline: none; 
    padding: 20px; 
    margin-right: -50%; 
    transform: translate(-50%, -50%);
    padding: 32px;
    width: 326px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px #adb4c4;
  }

  h2 {
    font-size: 25px;
    margin-top: 0;
  }

  input {
    line-height: 40px;
    width: 100%;
    height: 40px;
    border: 1px solid #c4c8d7;
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
      color: #d4d4df;
    }
  }

  form div {
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 150px;
    height: 40px;
    background: #7272fc;
    color: #fff;
    line-height: 40px;
    border-radius: 2px;
  }

  div button:nth-child(2) {
    width: 101px;
    background: #e5e5ff;
    color: #102d3e;
  }
`;

export { AddListModal, AddLinkModal };