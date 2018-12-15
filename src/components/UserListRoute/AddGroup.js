import React from 'react';
import styled from 'styled-components';
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

// const AddGroupBtn = styled.button`
//   width: 142px;
//   height: 48px;
//   background: linear-gradient(128.71deg, #5859BF 0%, #9495F5 100%);
//   box-shadow: 0 2px 15px rgba(217,138,255,0.5);
//   color: #fff;
//   font-weight: 500;

//   img { margin: -1px 9px 0 0; }

//   span { margin-top: 5px; }
// `;

class AddGroup extends React.Component {
  state = {
    animatingBubbles: false,
    showTextField: false,
    submitStatus: "initial",
    prevStatusIsInitial: false,
    value: ""
  };
  animateBubbles = _ => {
    this.setState({ animatingBubbles: false }, _ => {
      this.setState({ animatingBubbles: true });
    });
    setTimeout(() => {
      this.setState({ animatingBubbles: false });
    }, 700);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.animateBubbles();
    const { submitStatus } = this.state;

    if (this.state.showTextField) {
      if (this.textField.value === "") {
        return;
      }

      // When submitting, in which submitStatus?
      if (submitStatus === "initial" || submitStatus === "followingInitial") {
        console.log("first");
        this.setState({
          submitStatus: "submitting",
          prevStatusIsInitial: true
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
      } else if (
        submitStatus === "submitting" ||
        submitStatus === "followingSubmitting"
      ) {
        console.log("second");
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
          showTextField: !this.state.showTextField
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
  handleChange = e => {
    this.setState({ value: e.target.value });
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
          disabled={
            this.state.submitStatus === "submitting" ||
            this.state.submitStatus === "followingSubmitting"
          }
          onFocus={this.textFieldOnFocus}
          onBlur={this.textFieldOnBlur}
        />
        <AddGroupBtn
          animatingBubbles={this.state.animatingBubbles}
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