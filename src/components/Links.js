import React from 'react';
import styled from 'styled-components';
import LinkWrapper from './LinkWrapper';

import AddIcon from '../assets/img/icons/add.svg';
import DeleteIcon from '../assets/img/icons/delete.svg';

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 0 2px 8px #ecedff;
  margin-bottom: 20px;
  background: white;
  width: 510px;
  border-radius: 5px;
`;

const StyledDivLink = styled.div`
  position: relative;
  height: 105px;

  &:nth-child(odd) > div {
    border-color: ${props => {
      if (props.inEditMode) {
        if (props.selectedToEdit) {
          return "#9391ff";
        }
        return "#c8c7ff";
      } else {
        return "#fff";
      }
    }};
    &:hover {
      border-color: ${props => (props.inEditMode ? "#9391ff" : "#fff")};
    }
  }

  &:last-child > div,
  &:last-child a {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const EmptyLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 105px;
  box-sizing: border-box;
  padding: 30px;
  box-shadow: 0 2px 8px #ecedff;
  color: #818195;
  font-style: italic;
`;

const LinkAction = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;

  button {
    height: 30px;
    border-radius: 5px;
  }
`;

const LeftIcon = styled.button`
  width: 30px;
  margin-right: 20px;
  background: #fcf4ff;

  &:nth-child(2) {
    margin-right: 11px;
  }
`;

const EditModeIndicator = styled(LeftIcon)`
  width: 90px;
  background: #fff3e7;
  color: #6a6b91;
  font-family: "Avenir Next";
  font-size: 12px;
  font-weight: 500;
  transition: ${props =>
    props.inEditMode ? "opacity .3s" : "visibility 0s .3s, opacity .3s"};
  opacity: ${props => (props.inEditMode ? 1 : 0)};
  visibility: ${props => (props.inEditMode ? "visible" : "hidden")};
`;

const RightIcon = styled.button`
  width: 30px;
  margin-left: auto;
  background: #fff4f4;
`

const StyledEditSvg = styled.svg`
  overflow: visible;

  .path-1, .path-2, .path-0 {
    transition: transform 0.3s ease-in;
  }

  .path-1 {
    transform: ${props =>
      props.inEditMode
        ? "translate(2.5px, 0px) rotate(45deg)"
        : "translate(0px, 0px) rotate(0deg)"};
    transform-origin: top left;
  }

  .path-2 {
    transform: ${props => (props.inEditMode ? "scale(0, 1)" : "scale(1, 1)")};
    transform-origin: center;
  }

  .path-0 {
    transform: ${props =>
      props.inEditMode
        ? "translate(-4.5px, 3px) rotate(-45deg)"
        : "translate(0px, 0px) rotate(0deg)"};
  }
`;

class DivLink extends React.Component {
  state = {
    selectedToEdit: false
  }
  static getDerivedStateFromProps(props, state) {
    if (!props.inEditMode && state.selectedToEdit) {
      return {
        selectedToEdit: false
      };
    }
    return null;
  }
  setSelectedToEdit = boolean => {
    this.setState({
      selectedToEdit: boolean
    });
  };
  render() {
    const { 
      inEditMode, link, selectedLinkToEditIndex, 
      index, handleLinkSelect 
    } = this.props;
    return (
      <StyledDivLink 
        inEditMode={inEditMode} 
        selectedToEdit={this.state.selectedToEdit}
      >
        <LinkWrapper
          link={link}
          inEditMode={inEditMode}
          selectedLinkToEditIndex={selectedLinkToEditIndex}
          index={index}
          handleLinkSelect={handleLinkSelect}
          selectedToEdit={this.state.selectedToEdit}
          setSelectedToEdit={this.setSelectedToEdit}
        />
      </StyledDivLink>
    );
  }
}

const EditSvg = props => (
  <StyledEditSvg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height="10"
    width="12"
    inEditMode={props.inEditMode}
  >
    <defs>
      <path
        className="editSvg-path path-0"
        id={`editSvg-path-0-${props.groupId}`}
        opacity="1"
        d="M1,8 L11,8 C11.551915024494,8 12,8.448084975506 12,9 C12,9.551915024494 11.551915024494,10 11,10 L1,10 C0.448084975506,10 0,9.551915024494 0,9 C0,8.448084975506 0.448084975506,8 1,8Z"
      />
      <path
        className="editSvg-path path-1"
        id={`editSvg-path-1-${props.groupId}`}
        opacity="1"
        d="M1,0 L11,0 C11.551915024494,0 12,0.448084975506 12,1 C12,1.5519150244939999 11.551915024494,2 11,2 L1,2 C0.448084975506,2 0,1.5519150244939999 0,1 C0,0.448084975506 0.448084975506,0 1,0Z"
      />
      <path
        className="editSvg-path path-2"
        id={`editSvg-path-2-${props.groupId}`}
        opacity="1"
        d="M1,4 L11,4 C11.551915024494,4 12,4.448084975506 12,5 C12,5.551915024494 11.551915024494,6 11,6 L1,6 C0.448084975506,6 0,5.551915024494 0,5 C0,4.448084975506 0.448084975506,4 1,4Z"
      />
    </defs>
    <g opacity="1">
      <g opacity="1">
        <use
          xlinkHref={`#editSvg-path-0-${props.groupId}`}
          fill="rgb(108,86,140)"
          fillOpacity="1"
        />
      </g>
      <g opacity="1">
        <use
          xlinkHref={`#editSvg-path-1-${props.groupId}`}
          fill="rgb(108,86,140)"
          fillOpacity="1"
        />
      </g>
      <g opacity="1">
        <use
          xlinkHref={`#editSvg-path-2-${props.groupId}`}
          fill="rgb(108,86,140)"
          fillOpacity="1"
        />
      </g>
    </g>
  </StyledEditSvg>
);

export default class Links extends React.Component {
  state = {
    selectedLinkToEditIndex: null
  };
  handleLinkSelect = index => {
    this.setState({ selectedLinkToEditIndex: index });
  };
  render() {
    const { groupId, toggleEditMode, inEditMode } = this.props;
    const { selectedLinkToEditIndex } = this.state;
    return (
      <LinksContainer>      
        <LinkAction>
          <LeftIcon type="button" onClick={() => {
            this.props.toggleAddLinkModal();
            this.props.setSelectedGroup({
              id: groupId,
              name: this.props.groupName
            });
          }}>
            <img src={AddIcon} 
          />
          </LeftIcon>
          <LeftIcon type="button" onClick={toggleEditMode}>
            <EditSvg 
              inEditMode={inEditMode} 
              groupId={groupId}
            />
          </LeftIcon>
          <EditModeIndicator inEditMode={inEditMode} onClick={toggleEditMode}>
            Edit mode on
          </EditModeIndicator>
          <RightIcon type="button">
            <img src={DeleteIcon} />
          </RightIcon>
        </LinkAction>
        {this.props.links.length !== 0 ? (
          this.props.links.map((link, index) => (     
            <DivLink 
              key={`DivLink-${link.id}`} 
              link={link}
              inEditMode={inEditMode}              
              selectedLinkToEditIndex={selectedLinkToEditIndex}
              index={index}
              handleLinkSelect={this.handleLinkSelect}
            />
          ))
        ) : (
          <EmptyLink>No links here</EmptyLink>
        )}  
      </LinksContainer>
    );
  }
}