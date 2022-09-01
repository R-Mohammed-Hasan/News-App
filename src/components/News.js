import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class
News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center my-3">Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="My title" description="Desc" />
          </div>
          <div className="col-md-4">
            <NewsItem title="My title" description="Desc" />
          </div>
          <div className="col-md-4">
            <NewsItem title="My title" description="Desc" />
          </div>
        </div>
      </div>
    )
  }
}
