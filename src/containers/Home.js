import React from 'react';
import { withSiteData } from 'react-static';
import { hot } from 'react-hot-loader';

import logoImg from '../img/logo.png';

export default hot(module)(withSiteData(() => (
  <React.Fragment>
    <div className="hero-wrapper container">
      <div className="hero">
        <h1 className="hero__title">Curate links</h1>
        <p className="hero__subtitle">Stay organized, always be resourceful.</p>
        <a href="/signup">
          <div className="hero__button">Get Started</div>
        </a>
      </div>
      <img className="cards" src={logoImg} alt="" style={{width: 150}} />
    </div>
    <div className="container">
      <div className="pricing">
        <h1 className="pricing__title">Pricing</h1>
        <h2 className="pricing__subtitle">Free of charge at this stage.</h2>
        <p className="pricing__description">
          If you do find Cubik is to be useful, feel free to contribute a small amount of<br />
          money to keep it running. The money will be used to cover the costs of<br />
          hosting and data storage.
        </p>
        <a href="/pay">
          <div className="pricing__button">Buy me a coffee</div>
        </a>
      </div>
    </div>
  </React.Fragment>
)))
