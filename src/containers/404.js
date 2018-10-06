import React from 'react';

export default class NotFound extends React.Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    this.makeReady()
  }
  makeReady = () => {
    if (!this.state.ready) {
      this.setState({
        ready: true,
      })
    }
  }
  render () {
    // return this.state.ready ? (
    //   <React.Fragment>
    //     <h1>NOT FOUND</h1>
    //     <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    //   </React.Fragment>
    // ) : null

    return (
      <React.Fragment>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </React.Fragment>
    )
  }
}