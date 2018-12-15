import { keyframes } from 'styled-components';

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
  hori, 
  vert, 
  fadeOut, 
  rotate1, 
  rotate2
};