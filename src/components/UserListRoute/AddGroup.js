import React from 'react';
import {
  StyledAddGroup,
  TextField,
  AddGroupBtn,
  PlusIcon,
  Spinner,
  Tick
} from './AddGroup.css';

import img_addGroup from '../../assets/img/icons/addgroup/addgroup.svg';
import img_tick from '../../assets/img/icons/addgroup/tick.svg';

class AddGroup extends React.Component {
  state = {
    showTextField: false,
    submitStatus: "initial",
    prevStatusIsInitial: false,
    groupName: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { showTextField, groupName, submitStatus } = this.state;
    if (showTextField) {
      if (groupName === "") return;
      if (submitStatus === "initial" || submitStatus === "followingInitial") {
        this.setState({
          submitStatus: "submitting",
          prevStatusIsInitial: true
        });
        this.props.handleCreateGroup(groupName).then(() => {
          this.setState({
            submitStatus: "submitted",
            prevStatusIsInitial: false,
            groupName: ""
          });
          this.textField.value = "";
          this.textField.focus();
          setTimeout(() => {
            if (this.state.submitStatus === "submitted") {
              this.setState({
                submitStatus: "followingInitial",
                prevStatusIsInitial: false
              });
            }
          }, 1500);
        });
      } else if (submitStatus === "submitting") {
        return;
      } else if (submitStatus === "submitted") {
        console.log("third");
        this.setState({
          submitStatus: "submitting",
          prevStatusIsInitial: false
        });
        setTimeout(() => {
          this.setState({
            submitStatus: "submitted",
            prevStatusIsInitial: false
          });
          console.log(this.state.value);
          this.textField.value = "";
          this.textField.focus();

          setTimeout(() => {
            if (this.state.submitStatus === "submitted") {
              this.setState({
                submitStatus: "followingInitial",
                prevStatusIsInitial: false
              });
            }
          }, 2000);
        }, 3000);
      }
    } else {
      this.setState(
        {
          showTextField: !showTextField
        },
        () => {
          if (!this.state.showTextField) {
            this.textField.value = "";
          } else {
            setTimeout(() => {
              this.textField.focus();
            }, 1000);
          }
        }
      );
    }
  };
  handleChange = () => {
    this.setState({ groupName: this.textField.value.trim() });
  };
  textFieldOnFocus = () => {
    this.setState({ textFieldFocused: true });
  };
  textFieldOnBlur = () => {
    this.setState({ textFieldFocused: false });
  };
  render() {
    return (
      <StyledAddGroup onSubmit={this.handleSubmit}>
        <TextField
          showTextField={this.state.showTextField}
          placeholder="Enter name"
          ref={input => {
            this.textField = input;
          }}
          onChange={this.handleChange}
          disabled={this.state.submitStatus === "submitting"}
          onFocus={this.textFieldOnFocus}
          onBlur={this.textFieldOnBlur}
        />
        <AddGroupBtn
          showTextField={this.state.showTextField}
          type="submit"
        >
          <img src={img_addGroup} alt="" />
          <span>Add group</span>
          <PlusIcon
            showTextField={this.state.showTextField}
            submitStatus={this.state.submitStatus}
            prevStatusIsInitial={this.state.prevStatusIsInitial}
          >
            <div />
            <div />
          </PlusIcon>
          <Spinner submitStatus={this.state.submitStatus} />
          <Tick src={img_tick} alt="" submitStatus={this.state.submitStatus} />
        </AddGroupBtn>
      </StyledAddGroup>
    );
  }
}

export default AddGroup;