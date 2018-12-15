import { keyframes } from 'styled-components';

const topBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

const bottomBubbles = keyframes`
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

const hori = keyframes`
  from {
    width: 2px;
    height: 2px;
    transform: scaleX(0) rotate(0);
    opacity: 0;
  }
  to {
    width: 16px;
    height: 2.5px;
    transform: scaleX(1) rotate(360deg);
    opacity: 1;
  }
`;

const vert = keyframes`
  from {
    width: 2px;
    height: 2px;
    transform: scaleX(0) rotate(0);
    opacity: 0;
  }
  to {
    width: 16px;
    height: 2.5px;
    transform: scaleX(1) rotate(90deg);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const rotate1 = keyframes`
  from {
    transform: rotate(40deg);
  }
  to {
    transform: rotate(400deg);
  }
`;

const rotate2 = keyframes`
  to {
    transform: rotate(400deg);
  }
`;

export {
  topBubbles, 
  bottomBubbles, 
  hori, 
  vert, 
  fadeOut, 
  rotate1, 
  rotate2
};