import { createGlobalStyle } from 'styled-components';

import AvenirNextRegularSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Regular-subset.woff2';
import AvenirNextRegularSubsetWoff from './assets/fonts/AvenirNextLTPro-Regular-subset.woff';

import AvenirNextMediumSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Medium-subset.woff2';
import AvenirNextMediumSubsetWoff from './assets/fonts/AvenirNextLTPro-Medium-subset.woff';

import AvenirNextDemiSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Demi-subset.woff2';
import AvenirNextDemiSubsetWoff from './assets/fonts/AvenirNextLTPro-Demi-subset.woff';

import AvenirNextBoldSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Bold-subset.woff2';
import AvenirNextBoldSubsetWoff from './assets/fonts/AvenirNextLTPro-Bold-subset.woff';

// Why are the @font-face rules extracted to be used on its own? 
// GlobalStyle causes custom fonts to be re-requested when
// it get rerendered, or some other possible behaviors like
// rehyration, component state change.
// This will cause font loading problems like FOIT and FOUT. Bad bad.
export const fontFaceRules = `
  @font-face {
    font-family: "Avenir Next";
    src: local("Avenir Next Regular"), local("AvenirNext-Regular"),
        url(${AvenirNextRegularSubsetWoff2}) format('woff2'),
        url(${AvenirNextRegularSubsetWoff}) format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: "Avenir Next";
    src: local("Avenir Next Medium"), local("AvenirNext-Medium"),
        url(${AvenirNextMediumSubsetWoff2}) format('woff2'),
        url(${AvenirNextMediumSubsetWoff}) format('woff');
    font-weight: 500;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextDemiSubsetWoff2}) format('woff2'),
        url(${AvenirNextDemiSubsetWoff}) format('woff');
    font-weight: 600;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextBoldSubsetWoff2}) format('woff2'),
        url(${AvenirNextBoldSubsetWoff}) format('woff');
    font-weight: 700;
  }
`;

const GlobalStyle = createGlobalStyle`
  html, #root {
    height: 100%;
  }

  body {
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  input, button {
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif;
  }
  
  a {
    text-decoration: none;
    color: #313131;
  }
  
  h1 {
    font-size: 40px;
    color: #102d3e;
  }
  
  img {
    max-width: 100%;
  }
  
  button {
    height: 48px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  
    &:focus {
      outline: none;
    }
  }

  .container {
    width: 1070px;
    max-width: 90%;
    margin: auto;
  }
`;

export default GlobalStyle;