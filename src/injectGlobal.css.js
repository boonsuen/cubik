import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: "Avenir Next";
    src: url('/fonts/AvenirNextLTPro-Regular-subset.woff2') format('woff2'),
        url('/fonts/AvenirNextLTPro-Regular-subset.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url('/fonts/AvenirNextLTPro-Medium-subset.woff2') format('woff2'),
        url('/fonts/AvenirNextLTPro-Medium-subset.woff') format('woff');
    font-weight: 500;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url('/fonts/AvenirNextLTPro-Demi-subset.woff2') format('woff2'),
        url('/fonts/AvenirNextLTPro-Demi-subset.woff') format('woff');
    font-weight: 600;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url('/fonts/AvenirNextLTPro-Bold-subset.woff2') format('woff2'),
        url('/fonts/AvenirNextLTPro-Bold-subset.woff') format('woff');
    font-weight: 700;
  }

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