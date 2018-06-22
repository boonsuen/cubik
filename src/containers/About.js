import React from 'react'
import { hot } from 'react-hot-loader'
import { Head } from 'react-static'

import webdesign from '../img/webdesign.png'

export default hot(module)(() => (
  <React.Fragment>
    <Head>
      <title>About | Cubik</title>
    </Head>
    <div className="container">
      <h1>This is what we’re all about.</h1>
      <p>React, static sites, performance, speed. It’s the stuff that makes us tick.</p>
      <img src={webdesign} style={{width: 300}} />
    </div>
  </React.Fragment>
))
