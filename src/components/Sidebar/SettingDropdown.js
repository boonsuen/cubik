import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import Setting from '../../assets/img/icons/setting.svg';
import SettingArrow from '../../assets/img/icons/setting_arrow.svg';

const DropdownContainer = styled.div`

`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
`;

const SettingIcon = styled.img`
  width: 20px;
  margin-right: 5px;
`;

const ArrowDown = styled.img`
  transition: transform .3s;
  transform: ${props => props.rotate ? 'rotate(-90deg)' : 'rotate(0deg)' };
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 12px;
  right: 29px;
  width: 158px;
  height: 123px;
  margin: 0;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 1px 4px #98b1d9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #8b8dac;
  list-style: none;
  font-weight: 500;
  font-size: 15px;

  visibility: ${props => props.visible ? 'visible' : 'hidden' };
  opacity: ${props => props.visible ? '1' : '0' };
  transition: ${props => props.visible 
    ? 'opacity .3s;'
    : 'visibility 0s .3s, opacity .3s'
  };
`;

const ListItem = styled.li`
  padding: 4px 0;
  transition: color .3s;

  &:hover {
    color: #4e69ae;
  }
`;

class SettingDropdown extends React.Component {
  state = {
    dropdownOpen: false
  }
  toggleDropdown = () => {
    console.log('yolo');
    this.setState(state => ({dropdownOpen: !state.dropdownOpen}));
  }
  handleClickOutside = e => {
    console.log('handleClickOutside');
    this.setState({dropdownOpen: false});
  };
  render() {
    return (
      <DropdownContainer>
        <ButtonContainer onClick={this.toggleDropdown}>
          <SettingIcon src={Setting} alt="Setting" />
          <ArrowDown rotate={this.state.dropdownOpen ? 1 : 0} src={SettingArrow} alt="down arrow" />        
        </ButtonContainer>       
        <DropdownList visible={this.state.dropdownOpen ? 1 : 0}>
          <ListItem>Preference</ListItem>
          <ListItem>Plan</ListItem>
          <ListItem>Settings</ListItem>
          <ListItem onClick={this.props.logoutUser}>Sign out</ListItem>
        </DropdownList>
      </DropdownContainer>
    );
  }
}

export default onClickOutside(SettingDropdown);