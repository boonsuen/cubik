import React from 'react';
import styled from 'styled-components';

const StyledLinkWrapper = styled.div`
  height: ${props => (props.selectedToEdit ? "120px" : "105px")};
  box-sizing: border-box;
  box-shadow: 0 2px 8px #ecedff;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => {
    if (props.inEditMode) {
      if (props.selectedToEdit) {
        return "#a778ff";
      }
      return "#e1d1ff";
    } else {
      return "#fff";
    }
  }};
  border-radius: ${props => props.selectedToEdit && "5px"};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  top: ${props => props.selectedToEdit && "-4px"};
  transition: border-radius 0.3s, box-shadow 0.3s, border 0.3s, height 0.3s,
    top 0.3s;
  z-index: ${props => props.selectedToEdit && "1"};
  cursor: ${props => (props.selectedToEdit ? "auto" : "pointer")};

  &:hover {
    z-index: 1;
    border-radius: 5px;
    box-shadow: ${props => !props.inEditMode && "0 2px 8px #8f94ff"};
    border-color: ${props => (props.inEditMode ? "#a778ff" : "#fff")};
  }
`;

const Link = styled.a`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 29px;
  display: flex;
  align-items: center;
  pointer-events: ${props => props.inEditMode && "none"};
  background: #fff;
  color: #56578c;
  line-height: 1.4;
  ${props => props.inEditMode && "border-radius: 5px"};
  transition: color 0.3s, border-radius 0.3s, border 0.3s;

  &:hover {
    color: ${props => !props.inEditMode && "#6067f1"};
  }
`;

const StyledEditLinkForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  height: 100%;
  padding: 11px 24px;
  background: #fff;

  border-radius: 5px;

  input {
    width: 100%;
    height: 27px;
    box-sizing: border-box;
    padding: 3px 7px;
    background-color: #fcfcfc;
    border: 1px solid #c0c3d9;
    border-radius: 2px;
    color: #56578c;
    font-family: "Avenir Next";
    font-size: 14px;
    font-weight: 400;

    &:focus {
      outline: none;
    }
  }

  div {
    align-self: flex-end;
  }

  button {
    display: inline-flex;
    width: 60px;
    height: 27px;
    background-color: #b5c6e3;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
    font-family: "Avenir Next";
    font-size: 14px;
    font-weight: 500;

    &:last-child {
      color: #3a5a79;
      background-color: #65ffd1;
      margin-left: 12px;
    }
  }
`;

class EditLinkForm extends React.Component {
  render() {
    const {
      setSelectedToEdit,
      link: { title, url }
    } = this.props;
    return (
      <StyledEditLinkForm>
        <input type="text" defaultValue={title} />
        <input type="text" defaultValue={url} />
        <div>
          <button
            type="button"
            onClick={() => {
              setSelectedToEdit(false);
            }}
          >
            cancel
          </button>
          <button type="submit">save</button>
        </div>
      </StyledEditLinkForm>
    );
  }
}

class LinkWrapper extends React.Component {
  handleClick = () => {
    if (this.props.inEditMode && !this.props.selectedToEdit) {
      this.props.setSelectedToEdit(true);
      this.props.handleLinkSelect(this.props.index);
    }
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.selectedLinkToEditIndex !== this.props.index &&
      this.props.selectedToEdit
    ) {
      this.props.setSelectedToEdit(false);
    }
  }
  render() {
    const { inEditMode, link, selectedToEdit } = this.props;
    return (
      <StyledLinkWrapper
        inEditMode={inEditMode}
        selectedToEdit={selectedToEdit}
        onClick={this.handleClick}
      >
        {selectedToEdit && inEditMode ? (
          <EditLinkForm
            link={link}
            setSelectedToEdit={this.props.setSelectedToEdit}
          />
        ) : (
          <Link
            inEditMode={inEditMode}
            key={link.id}
            href={link.url}
            target="_blank"
          >
            {link.title}
          </Link>
        )}
      </StyledLinkWrapper>
    );
  }
}

export default LinkWrapper;