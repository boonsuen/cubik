import styled, { css } from 'styled-components';
import {
  topBubbles, 
  bottomBubbles, 
  hori, 
  vert, 
  fadeOut, 
  rotate1, 
  rotate2
} from './keyframes.css';

const StyledAddGroup = styled.form`
  position: relative;
`;

const TextField = styled.input`
  width: ${props => (props.showTextField ? "177px" : "142px")};
  box-sizing: border-box;
  height: 48px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: #8787a2;
  font-family: "Avenir Next";
  font-size: 14px;
  font-weight: 500;
  padding-left: 14px;
  position: absolute;
  top: 0;
  right: 0;
  transition: width 0.3s cubic-bezier(0.64, 0.04, 0.35, 1) 0.3s;

  &::placeholder {
    color: #9d9dac;
    transition: opacity 0.3s 0.7s;
    opacity: ${props => (props.showTextField ? 1 : 0)};
  }
`;

const bubbleColor = "#db9eff";

const topMixin = css`
  animation: ${topBubbles} 0.75s ease-in-out forwards;
`;

const bottomMixin = css`
  animation: ${bottomBubbles} 0.75s ease-in-out forwards;
`;

const horiMixin = css`
  animation: ${hori} 0.3s ease-in 0.7s forwards;
`;

const vertMixin = css`
  animation: ${vert} 0.3s ease-in 0.7s forwards;
`;

const fadeOutMixin = css`
  animation: ${fadeOut} 0.2s ease-in forwards;
`;

const rotateMixin = css`
  animation: ${rotate2} 1.1s cubic-bezier(0.77, 0, 1, 1),
    ${rotate1} 0.6s linear 1.1s infinite;
`;

const rotateMixin2 = css`
  animation: ${rotate2} 1.1s cubic-bezier(0.77, 0, 1, 1),
    ${rotate1} 0.6s linear 1.1s infinite;
  transition: opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35);
  opacity: 0;
`;

const AddGroupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.showTextField ? "48px" : "142px")};
  height: 48px;
  outline: none;
  box-sizing: border-box;
  background: linear-gradient(128.71deg, #5859bf 0%, #9495f5 100%);
  box-shadow: 0 2px 15px rgba(217, 138, 255, 0.5);
  color: #fff;
  font-family: "Avenir Next";
  font-weight: 500;
  border-radius: 5px;
  font-size: 16px;
  padding: 0;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s,
    width 0.3s cubic-bezier(0.64, 0.04, 0.35, 1) 0.3s;

  &:focus {
    outline: 0;
  }

  &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
    z-index: -1;
  }

  &:before {
    ${props => (props.animatingBubbles ? topMixin : null)};
    display: ${props => (props.animatingBubbles ? "block" : "none")};
    top: -75%;
    background-image: radial-gradient(
        circle,
        ${bubbleColor} 20%,
        transparent 20%
      ),
      radial-gradient(
        circle,
        transparent 20%,
        ${bubbleColor} 20%,
        transparent 30%
      ),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(
        circle,
        transparent 10%,
        ${bubbleColor} 15%,
        transparent 20%
      ),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
      15% 15%, 10% 10%, 18% 18%;
  }

  &:after {
    ${props => (props.animatingBubbles ? bottomMixin : null)};
    display: ${props => (props.animatingBubbles ? "block" : "none")};
    bottom: -75%;
    background-image: radial-gradient(
        circle,
        ${bubbleColor} 20%,
        transparent 20%
      ),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(
        circle,
        transparent 10%,
        ${bubbleColor} 15%,
        transparent 20%
      ),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%),
      radial-gradient(circle, ${bubbleColor} 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
      20% 20%;
  }

  &:active {
    transform: scale(0.9);
  }

  img:first-child {
    margin: -1px 9px 0 0;
  }
  span {
    margin-top: 5px;
  }

  img:first-child,
  span {
    transition: opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35);
    opacity: ${props => (props.showTextField ? 0 : 1)};
  }
`;

const PlusIcon = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% - 8px);
  opacity: ${props =>
    props.submitStatus === "submitted" || props.submitStatus === "submitting"
      ? 0
      : 1};
  ${props => {
    if (props.submitStatus === "submitting") {
      if (props.prevStatusIsInitial) {
        return fadeOutMixin;
      }
    } else if (props.submitStatus === "submitted") {
      return "opacity: 0;";
    } else if (props.submitStatus === "followingInitial") {
      return `transition: opacity 1s cubic-bezier(0.55, 0.42, 0.87, 1.35) .3s;
      opacity: 1;`;
    }
  }};

  div {
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    position: absolute;
    transition: opacity 5s cubic-bezier(0.55, 0.42, 0.87, 1.35);
    opacity: 0;
  }

  div:first-child {
    ${props => {
      return props.showTextField ? horiMixin : null;
    }};
  }
  div:last-child {
    ${props => {
      return props.showTextField ? vertMixin : null;
    }};
  }
`;

const Spinner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-left-color: #fff;
  border-top-color: #fff;
  border-radius: 50%;

  transition: opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35) 0.3s;
  ${props => {
    if (props.submitStatus === "submitting") {
      return rotateMixin;
    } else if (props.submitStatus === "submitted") {
      return rotateMixin2;
    } else if (props.submitStatus === "initial") {
      return "opacity: 0;";
    } else if (props.submitStatus === "followingInitial") {
      return "opacity: 0;";
    }
  }};
`;

const Tick = styled.img`
  width: 17px;
  height: 14px;
  position: absolute;
  top: calc(50% - 6px);
  transition: opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35) 0.3s;
  transition: ${props =>
    props.submitStatus === "submitted"
      ? "opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35) 0.3s"
      : "opacity 0.3s cubic-bezier(0.55, 0.42, 0.87, 1.35)"};
  opacity: ${props => (props.submitStatus === "submitted" ? 1 : 0)};
`;

export {
  StyledAddGroup,
  TextField,
  AddGroupBtn,
  PlusIcon,
  Spinner,
  Tick
};