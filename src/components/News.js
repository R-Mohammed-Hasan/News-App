import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
    page: 1
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `News Center - ${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    }`;
  }

  render() {
    return (
      <>
        <h1 className="text-center my-5">Top Headlines of India</h1>
        { this.state.loading && <Loading /> }
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem
                      url={element.url}
                      title={
                        element.title
                          ? element.title.slice(0, 60) + "..."
                          : "No title"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 150) + "..."
                          : "No description"
                      }
                      publishedAt={new Date(element.publishedAt).toGMTString()}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
                      }
                      source={
                        element.source.name
                          ? element.source.name
                          : "Not available"
                      }
                    />
                    {this.state.articles.length >= this.state.totalResults &&
                      <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="text-center my-4 d-flex justify-content-between">
          <button
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            style={{ textTransform: "none" }}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-dark"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 15)
            }
            onClick={this.handleNextClick}
            style={{ textTransform: "none" }}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }

  fetchMoreData = async () => {
    console.log("before"+this.state.page);
    this.setState({ page: this.state.page + 1 });
    console.log(this.state.page);
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageCount}`,
      {
        method: "GET",
        headers: {
          Authorization: "0bea793f263d481e9e402b7ebb448641",
        },
      }
    );
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
    console.log(this.state.articles);
    console.log(this.state.totalResults);
  };

  async updateNews() {
    this.setState({ loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageCount}`,
      {
        method: "GET",
        headers: {
          Authorization: "0bea793f263d481e9e402b7ebb448641",
        },
      });
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  // This executes after rendering the component
  async componentDidMount() {
    this.updateNews();
  }



  handlePrevClick = async () => {
    console.log(this.state.page);
    this.setState({ page: this.state.page - 1 });
    console.log(this.state.page - 1);
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log(this.state.page);
    this.setState({ page: this.state.page + 1 });
    console.log(this.state.page + 1);
    this.updateNews();
  };
}
