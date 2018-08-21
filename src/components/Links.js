import React from 'react';
import styled from 'styled-components';
import { AddLinkModal } from './Modals';

import AddIcon from '../img/icons/add.svg';
import EditIcon from '../img/icons/edit.svg';
import DeleteIcon from '../img/icons/delete.svg';

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 0 2px 8px #ecedff;
  margin-bottom: 20px;
  background: white;
  width: 510px;
`;

const StyledLinks = styled.a`
  width: 100%;
  height: 105px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  color: #56578c;
  box-shadow: 0 2px 8px #ecedff;
  line-height: 1.4;
  transition: color 300ms, border-radius 300ms, box-shadow 300ms;

  &:hover {
    color: #6067f1;
    box-shadow: 0 2px 8px #8f94ff;
    z-index: 1;
    border-radius: 5px;
  }
`;

const LinkAction = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;

  button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
`;

const LeftIcon = styled.button`
  margin-right: 20px;
  background: #fcf4ff;
`;

const RightIcon = styled.button`
  margin-left: auto;
  background: #fff4f4;
`

export default class Links extends React.Component {
  state = {
    showModal: false
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  handleAddLink = (url, title) => {
    console.log(url, title);
  }
  render() {
    return (
      <LinksWrapper>
        <AddLinkModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Add New Link Modal"
        >
          <h2>Add link</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleAddLink(this.inputUrl.value, this.inputTitle.value);
          }}>
            <input 
              placeholder="URL"
              ref={(el) => { this.inputUrl = el }} 
              autoFocus  
            />
            <input 
              placeholder="Title"
              ref={(el) => { this.inputTitle = el }} 
            />
            <div>
              <button type="submit">Add</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </div>
          </form>
        </AddLinkModal>
        <LinkAction>
          <LeftIcon type="button" onClick={this.toggleModal}>
            <img src={AddIcon} />
          </LeftIcon>
          <LeftIcon type="button">
            <img src={EditIcon} />
          </LeftIcon>
          <RightIcon type="button">
            <img src={DeleteIcon} />
          </RightIcon>
        </LinkAction>
        {this.props.links.map(link => (
          <StyledLinks key={link.id} href={link.url} target="_blank">
            {link.title}
          </StyledLinks>
        ))}      
      </LinksWrapper>
    );
  }
}
