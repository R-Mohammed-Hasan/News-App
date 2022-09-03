import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class
News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
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
          { !this.state.loading && this.state.articles.map((element,index) =>{
           return (<div className="col-md-4" key={index}>
                    <NewsItem url={element.url} title={element.title ? element.title.slice(0,60)+ "..." : "No title"}
                     description={element.description ? element.description.slice(0,150) + "..." : "No description"}
                     publishedAt={new Date(element.publishedAt).toGMTString()}
                     imageUrl={element.urlToImage ? element.urlToImage : "https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"}
                     source={element.source.name ? element.source.name : "Not available"} />
                </div>)
          })
          }
        </div>
        <div className="text-center my-4 d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick} style={{textTransform: "none"}}>&larr; Previous</button>
          <button className="btn btn-dark" disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults/15)} onClick={this.handleNextClick} style={{textTransform: "none"}}>Next &rarr;</button>

        </div>
      </div>
    )
  }


  // This executes after rendering the component
  async componentDidMount(){
    this.setState({loading: true});
    let date = new Date();
    let oldDateArray = [date.getFullYear(),date.getMonth()+1,date.getDate() - 2];
    if(oldDateArray[2] <= 0){
      oldDateArray[1] -= 1;
      oldDateArray[2] = 30;
      // console.log(oldDateArray[2] <= 0);
    }
    console.log(oldDateArray);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageCount}&from=${oldDateArray.join("-")}`,{
      method: "GET",
      headers: {
        Authorization: "0bea793f263d481e9e402b7ebb448641"
      }
    });
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
}


  handlePrevClick = async () => {
    this.setState({loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageCount}`,{
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
          let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageCount}`,{
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
