import React from 'react';
import { Route } from 'react-static';
import styled from 'styled-components';
import Sublist from './Sublist';
import AllLinks from './AllLinks';
import ReadingList from './ReadingList';
import Uncategorised from './Uncategorised';
import Trash from './Trash';
import Links from './Links';
import { AddLinkModal } from './Modals';

import db from '../firebase/db';
import { DataContext } from './CubikApp';
import { LinksGroupContainer } from './app.css';

const StyledContent = styled.div`
  background: #f7f8fe;
  flex: 1;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: scroll;
`;

const ModalSublist = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  label {
    font-weight: 500;
    color: #495f8a;
  }
  
  div {
    margin-left: 20px;
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Content extends React.Component {
  state = {
    showModal: false,
    modalSublistText: 'Ungrouped',
    sublistLinks: this.props.sublistLinks
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  setModalSublistText = (modalSublistText) => {
    this.setState({
      modalSublistText
    });
  }
  handleAddLink = (sublist, url, title) => {
    console.log(sublist, url, title);
    db.collection(`users/${this.props.userId}/lists/4W8P97ezy7tkgvtuSAcu/links`).add({
      sublist,
      title,
      url,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.setState((state) => {
        const sublistLinks = {...state.sublistLinks}
        sublistLinks[sublist].push({
          id: docRef.id,
          sublist,
          title,
          url
        });
        return {
          sublistLinks
        }
      }, () => {
        this.setState((state) => ({
          showModal: !state.showModal,
        }));
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  render () {
    return (
      <StyledContent>
        <Route path="/app" render={
          () => <AllLinks allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />
        <Route path="/app/reading-list" render={
          () => <ReadingList allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        <Route path="/app/uncategorised" render={
          () => <Uncategorised allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        <Route path="/app/trash" render={
          () => <Trash allLinks={this.props.allLinks} toggleModal={this.toggleModal} />} exact />    
        {this.props.lists.map((list) => (
          <Route key={`listRoute-${list.id}`} path={`/app/${list.id}`} render={({match}) => (
            <React.Fragment>
              <h1>{list.title} {match.url.replace(/\/app\//, '')}</h1>
              <Links 
                links={this.props.ungroupedLinks} 
                toggleModal={this.toggleModal} 
                setModalSublistText={this.setModalSublistText}  
              />              
              <LinksGroupContainer>
                {Object.keys(this.state.sublistLinks).map((item, index) => (                
                  <Sublist 
                    key={`SublistLinks-${index}`} 
                    title={item} 
                    links={this.state.sublistLinks[item]} 
                    toggleModal={this.toggleModal}
                    setModalSublistText={this.setModalSublistText}
                  />
                ))}
              </LinksGroupContainer>
            </React.Fragment>
          )} />
        ))}
        <AddLinkModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Add New Link Modal"
        >
          <h2>Add link</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const sublist = this.state.modalSublistText === 'Ungrouped' ? null : this.state.modalSublistText;
            this.handleAddLink(
              sublist,
              this.inputUrl.value, 
              this.inputTitle.value,        
            );
          }}>
            <ModalSublist>
              <label>Sublist:</label>
              <div>{this.state.modalSublistText}</div>
            </ModalSublist>
            <ModalInputLabel htmlFor="link-url">URL</ModalInputLabel>
            <input 
              id="link-url" placeholder="https://..."
              ref={(el) => { this.inputUrl = el }} 
              autoFocus  
            />
            <ModalInputLabel htmlFor="link-title">Title</ModalInputLabel>
            <input 
              id="link-title" placeholder="Enter the title (optional)"
              ref={(el) => { this.inputTitle = el }} 
            />
            <ModalButtons>
              <button type="submit">Add</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </ModalButtons>
          </form>
        </AddLinkModal>
      </StyledContent>
    );
  }
}

export default props => (
  <DataContext.Consumer>
    {data => {
      if (data.links) {
        const sublistLinks = data.links.filter(link => link.sublist);
        return <Content 
          {...props} 
          userId={data.user.id}
          lists={data.lists} 
          allLinks={data.allLinks}
          ungroupedLinks={data.links.filter(link => !link.sublist)} 
          sublistLinks={sublistLinks.reduce((accumulator, currentValue, currentIndex) => {
            if (accumulator[currentValue.sublist]) {
              accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
            } else {
              accumulator[currentValue.sublist] = [];
              accumulator[currentValue.sublist].push(sublistLinks[currentIndex]);
            }
            return accumulator;
          }, {})}
        />
      } else {
        return <Content 
          {...props} 
          lists={data.lists} 
          allLinks={data.allLinks}
        />
      }
    }}
  </DataContext.Consumer>
);