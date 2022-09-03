import React, { Component } from 'react'
import loading from './loading.gif';

export default class Loading extends Component {
  render() {
    // document.documentElement.scrollTop = 0;
    return (
      <div className="loading" style={{textAlign: 'center'}}>
          <img src={loading} alt="Loading" />
      </div>
    )
  }
}
