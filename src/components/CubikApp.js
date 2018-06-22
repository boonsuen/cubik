import React from 'react';
import { Head } from 'react-static'
import Sidebar from './Sidebar';
import Content from './Content';

const CubikApp = () => (
  <React.Fragment>
    <Head>
      <link href="/style.css" rel="stylesheet" />
    </Head>
    <div className="app">
      <Sidebar />
      <Content />
    </div>
  </React.Fragment>
);

export default CubikApp;