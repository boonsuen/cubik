import React from 'react'
import { Head } from 'react-static'

import webdesign from '../img/webdesign.png'

export default () => (
  <React.Fragment>
    <Head>
      <title>About | Cubik</title>
    </Head>
    <div>
      <h1>This is what we’re all about.</h1>
      <p>React, static sites, performance, speed. It’s the stuff that makes us tick.</p>
      <img src={webdesign} style={{width: 300}} />
    </div>
  </React.Fragment>
);