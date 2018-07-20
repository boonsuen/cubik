import React from 'react';
import { withSiteData, Link, Head } from 'react-static';

import logoImg from '../img/logo.png';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          {`
          <script>
            window.EMOJICOM_WIDGET = {
              campaign: "W4mvMmYKKGjSpKpsybwx"
            };
          </script>
          <script src="https://cdn.emojicom.io/embed/widget.js" async></script>
          `}
        </Head>
        <div className="hero-wrapper">
          <div className="hero">
            <h1 className="hero__title">Curate links</h1>
            <p className="hero__subtitle">Stay organized, always be resourceful.</p>
            <Link to="/signup" className="hero__button">Get Started
            </Link>
          </div>
          <img className="cards" src={logoImg} alt="" style={{width: 150}} />
        </div>
        <div id="emojicom-widget-inline"></div>
        <div>
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
    );
  }
}

export default withSiteData(Home);
