import React from 'react';
import styled from 'styled-components';
import isURL from 'validator/lib/isURL';
import { StyledAddLinkModal } from '../Modals';

import img_hideModal from '../../assets/img/icons/modal/hidemodal.svg';
import img_link from '../../assets/img/icons/modal/link.svg';
import img_plus from '../../assets/img/icons/modal/plus.svg';

const Header = styled.div`
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
  background-color: #faebff;
  box-shadow: 0 2px 4px rgba(223, 239, 255, 0.5);
`;

const GroupInfo = styled.div`
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

const UrlLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputLabel = styled.label`
  color: #71718a;
  margin-bottom: 3px;
  display: inline-block;
`;

const InvalidUrlIndicator = styled(InputLabel)`
  color: #996781;
  transition: ${props =>
    !props.isUrlValid ? "opacity .3s" : "visibility 0s .3s, opacity .3s"};
  opacity: ${props => (!props.isUrlValid ? 1 : 0)};
  visibility: ${props => (!props.isUrlValid ? "visible" : "hidden")};
`;

const Input = styled.input`
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
`;

const InputUrl = styled(Input)`
  border-color: ${props => !props.isUrlValid && '#ffb5d1'};
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

const SubmitBtnCtn = styled.div`
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
  state = {
    isUrlValid: null
  }
  validateUrl = url => { 
    if (!isURL(url)) {
      return 'INVALID';
    } else if (
      !url.startsWith('http://') && !url.startsWith('https://')
    ) {
      return 'VALID-RELATIVE';
    } else {
      return 'VALID';
    }
  };
  handleInputUrlChange = () => {
    if (this.state.isUrlValid === false) {
      this.setState({ isUrlValid: null });
    }
  }
  render() {
    const { 
      showAddLinkModal, 
      toggleAddLinkModal,
      groupId,
      groupName,
      handleAddLink
    } = this.props;
    const isUrlValid = 
      this.state.isUrlValid || this.state.isUrlValid === null;
    return (
      <StyledAddLinkModal
        isOpen={showAddLinkModal}
        onRequestClose={toggleAddLinkModal}
        contentLabel="Add Link Modal"
      >
        <Header>
          <Circle>
            <img src={img_link} />
          </Circle>
          <h2>Add link</h2>
          <button onClick={toggleAddLinkModal} type="button">
            <img src={img_hideModal} />
          </button>
        </Header>
        <form onSubmit={(e) => {
          e.preventDefault();          
          const title = this.inputTitle.value.trim();
          let url = this.inputUrl.value.trim();
          if (!url) {
            return;
          }
          if (this.validateUrl(url) === 'INVALID') {
            this.setState({ isUrlValid: false })
            setTimeout(() => {
              if (this.state.isUrlValid === false) {
                this.setState({ isUrlValid: null });
              }
            }, 2000);
            return;
          } else if (this.validateUrl(url) === 'VALID-RELATIVE') {
            url = `http://${url}`;
            console.log('relative', url);
          } else if (this.validateUrl(url) === 'VALID') {
            console.log('okay');
          }
          handleAddLink(groupId, title, url);
        }}>
          <GroupInfo>
            <label>Group:</label>
            <div>{groupName}</div>
          </GroupInfo>
          <UrlLabels>
            <InputLabel htmlFor="link-url">URL</InputLabel>
            <InvalidUrlIndicator 
              isUrlValid={isUrlValid}
              htmlFor="link-url"
            >
              Invalid URL
            </InvalidUrlIndicator>
          </UrlLabels>
          <InputUrl
            id="link-url" placeholder="https://..."
            onChange={this.handleInputUrlChange}
            ref={(el) => { this.inputUrl = el }} 
            isUrlValid={isUrlValid}
            autoComplete="off" spellCheck={false}       
            autoFocus required
          />
          <InputLabel htmlFor="link-title">Title - </InputLabel>
          <FetchTitleBtn type="button">Get title from link</FetchTitleBtn>
          <Input 
            id="link-title" placeholder="Enter the title (optional)"
            ref={(el) => { this.inputTitle = el }} autoComplete="off"
          />
          <SubmitBtnCtn>
            <button type="submit">
              <img src={img_plus} />Add
            </button>
          </SubmitBtnCtn>
        </form>
      </StyledAddLinkModal>
    );
  }
}

export default AddLinkModal;