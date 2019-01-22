import React from 'react';
import styled from 'styled-components';

import img_goBack from '../../assets/img/icons/list/goback.svg';

const Container = styled.div`
  width: 480px;

  h2 {
    color: #4b59a2;
  }

  input {
    box-sizing: border-box;
    width: 392px;
    height: 44px;
    border-radius: 5px;
    border: 1px solid #8977ff;
    padding-left: 11px;
    color: #06143b;
    font-size: 20px;    
    font-weight: 500;
    outline: none;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0 2px 4px rgba(255, 209, 242, 0.5);
    }
  }

  p {
    color: #666c8a;
  }

  button {
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
  }
`;

const GoBack = styled.button`
  width: 33px;
  height: 33px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(234, 234, 234, 0.5);

  img {
    margin-left: -1px;
  }
`;

const RenameList = styled.div`
  margin-top: 65px;
`;

const SaveBtn = styled.button`
  width: 90px;
  height: 40px;
  margin-top: 20px;
  border-radius: 20px;
  color: #fff;
  background: #807eff;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin: 45px 0;
  background: #dde2ea;
`;

const DeleteListBtn = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 23px;
  border-radius: 20px;
  color: #ff292c;
  background: #ffdada;
`;

export default class EditList extends React.Component {
  render() {
    const { toggleEditListMode, listTitle } = this.props;
    return (
      <Container>
        <GoBack onClick={toggleEditListMode} type="button">
          <img src={img_goBack} />
        </GoBack>
        <RenameList>
          <h2>Rename list</h2>
          <input type="text" defaultValue={listTitle} spellCheck={false} />
          <SaveBtn type="button">Save</SaveBtn>
        </RenameList>
        <Separator />
        <p>
          All information including the links and the groups will be permanently removed. 
          This action cannot be undo.
        </p>
        <DeleteListBtn type="button">Delete list</DeleteListBtn>
      </Container>
    );
  }
}