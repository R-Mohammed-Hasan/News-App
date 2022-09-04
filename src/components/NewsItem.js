import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, description, url, imageUrl,source,publishedAt } = this.props;
    return (
      <div>
        <div className="card m-lg-3">
          <div
            className=" bg-image hover-overlay ripple text-center"
            data-mdb-ripple-color="light"
          >
            <img src={imageUrl} className="img-fluid" />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger p-2">
              {source}
            </span>
            <p className="card-text">{description}</p>
            <div className="d-flex flex-column flex-xl-row align-items-baseline justify-content-between">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
                style={{ textTransform: "none" }}
              >
                Read more...
              </a>
              <p className="d-md-inline-block published-time mt-3 mt-xl-0">{publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
