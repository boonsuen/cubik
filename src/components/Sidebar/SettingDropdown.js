import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import img_setting from '../../assets/img/icons/setting.svg';
import img_settingArrow from '../../assets/img/icons/setting_arrow.svg';
import img_preference from '../../assets/img/icons/dropdown/preference.svg';
import img_account from '../../assets/img/icons/dropdown/account.svg';
import img_signout from '../../assets/img/icons/dropdown/signout.svg';

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
  margin: 0;
  padding: 0px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 1px 8px #e8d8ff;
  border-radius: 5px;
  color: #7e81a8;
  list-style: none;
  font-weight: 500;
  font-size: 15px;
  transform: ${props => props.visible
    ? 'translateY(0)' 
    : 'translateY(8px)'};

  visibility: ${props => props.visible ? 'visible' : 'hidden' };
  opacity: ${props => props.visible ? '1' : '0' };
  transition: transform .2s ease-in-out, ${props => props.visible 
    ? 'opacity .3s'
    : 'visibility 0s .3s, opacity .3s'};
`;

const ListItem = styled.li`
  padding-left: 25px;
  height: 39px;
  transition: all .3s;
  display: flex;
  align-items: center;
  color: #7e81a8;

  &:hover {
    background: #fefcff;
    color: #626593;
  }

  div {
    width: 25px;
  }

  img {
    width: 14px;
    margin-top: 2px;
  }
`;

const ListItem_Signout = styled(ListItem)`
  background: #fafbff;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  &:hover {
    cursor: pointer;
    background: #fafbff;
  }
`;

class SettingDropdown extends React.Component {
  state = {
    dropdownOpen: false
  }
  toggleDropdown = () => {
    this.setState(state => ({dropdownOpen: !state.dropdownOpen}));
  }
  handleClickOutside = e => {
    this.setState({dropdownOpen: false});
  };
  render() {
    return (
      <DropdownContainer>
        <ButtonContainer onClick={this.toggleDropdown}>
          <SettingIcon src={img_setting} alt="Setting" />
          <ArrowDown rotate={this.state.dropdownOpen ? 1 : 0} src={img_settingArrow} alt="down arrow" />        
        </ButtonContainer>       
        <DropdownList visible={this.state.dropdownOpen ? 1 : 0}>
          <ListItem>        
            <div><img src={img_preference} /></div>Preference
          </ListItem>
          <Link to="/app/account">
            <ListItem>            
              <div><img src={img_account} /></div>Account
            </ListItem>
          </Link>
          <ListItem_Signout onClick={this.props.logoutUser}>
            <div><img src={img_signout} /></div>Sign out
          </ListItem_Signout>
        </DropdownList>
      </DropdownContainer>
    );
  }
}

export default onClickOutside(SettingDropdown);