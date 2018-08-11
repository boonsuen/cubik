import React from 'react';
import { Head } from 'react-static';

import ethereum from '../img/ethereum.png';

const About = () => (
  <React.Fragment>
    <Head>
      <title>About | Cubik</title>
    </Head>
    <div>
      <h1>This is what we’re all about.</h1>
      <p>React, static sites, performance, speed. It’s the stuff that makes us tick.</p>
      <img src={ethereum} style={{width: 300}} alt="ethereum" />
    </div>
  </React.Fragment>
);

export default About;