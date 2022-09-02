import React, { Component } from 'react'

export class NewsItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let {title, description, url, imageUrl } = this.props
    return (
      <div>
        <div className="card m-3">
            <div className=" bg-image hover-overlay ripple text-center" data-mdb-ripple-color="light">
              <img src={imageUrl} className="img-fluid" loading="lazy"/>
              <a>
                <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
              </a>
            </div>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={url} target="_blank" rel="noopener" className="btn btn-dark" style={{textTransform: "none"}}>Read more...</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
