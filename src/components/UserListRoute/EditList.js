import React from 'react';
import { Redirect } from 'react-static';
import styled from 'styled-components';

import { InitialDataContext } from '../CubikApp';
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

const RenameList = styled.form`
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

class EditList extends React.Component {
  state = {
    listTitle: this.props.list.title
  };
  handleListTitleChange = e => {
    this.setState({ listTitle: e.target.value });
  };
  handleDeleteClick = e => {
    this.props.deleteList(this.props.list.id).then(() => {
      this.props.history.push('/app');
    });
  };
  render() {
    const { toggleEditListMode } = this.props;
    return (
      <Container>
        <GoBack onClick={toggleEditListMode} type="button">
          <img src={img_goBack} />
        </GoBack>
        <RenameList onSubmit={e => {
          e.preventDefault();
          const newTitle = this.state.listTitle.trim();
          if (newTitle === this.props.listTitle) {
            return;
          }
          this.props.renameList(this.props.list.id, newTitle).then(() => {
            this.props.toggleEditListMode();
          });
        }}>
          <h2>Rename list</h2>
          <input 
            type="text" 
            defaultValue={this.state.listTitle} 
            onChange={this.handleListTitleChange} 
            spellCheck={false} 
            autoFocus
          />
          <SaveBtn type="submit">Save</SaveBtn>
        </RenameList>
        <Separator />
        <p>
          All information including the links and the groups will be permanently removed. 
          This action cannot be undo.
        </p>
        <DeleteListBtn 
          onClick={this.handleDeleteClick} 
          type="button"
        >
          Delete list
        </DeleteListBtn>
      </Container>
    );
  }
}

export default props => (
  <InitialDataContext.Consumer>
    {data => (
      <EditList 
        {...props} 
        renameList={data.renameList} 
        deleteList={data.deleteList}
      />
    )}
  </InitialDataContext.Consumer>
);