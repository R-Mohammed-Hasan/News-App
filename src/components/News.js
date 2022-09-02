import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'

export default class
News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }


  render() {
    return (
      <div className="container my-3">
        { this.state.loading && <Loading /> }
        <h1 className="text-center my-5">Top Headlines of India</h1>
        <div className="row">
          {this.state.articles.map((element,index) =>{
           return (<div className="col-md-4" key={index}>
                    <NewsItem url={element.url} title={element.title ? element.title.slice(0,45)+ "..." : "No title"} description={element.description ? element.description.slice(0,100) + "..." : "No description"}  imageUrl={element.urlToImage ? element.urlToImage : "https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"} />
                </div>)
          })
          }
        </div>
        <div className="text-center my-4 d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button className="btn btn-dark" disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults/15)} onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }


  // This executes after rendering the component
  async componentDidMount(){
    this.setState({loading: true})
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page}&pageSize=${this.props.pageCount}`,{
      method: "GET",
      headers: {
        Authorization: "0bea793f263d481e9e402b7ebb448641"
      }
    });
    let parsedData = await data.json();
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
}


  handlePrevClick = async () => {
    this.setState({loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page - 1}&pageSize=${this.props.pageCount}`,{
      method: "GET",
      headers: {
        Authorization: "0bea793f263d481e9e402b7ebb448641"
      }
    });
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    });
  }

  handleNextClick = async () => {
    if(!((this.state.page + 1) > Math.ceil(this.state.totalResults/this.props.pageCount))){
          this.setState({loading: true});
          let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page + 1}&pageSize=${this.props.pageCount}`,{
            method: "GET",
            headers: {
              Authorization: "0bea793f263d481e9e402b7ebb448641"
            }
          });
          let parsedData = await data.json();
          this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
          });
      }
  }



}
