import React,{useEffect,useState} from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const apiKey = process.env.REACT_APP_API_KEY;



  const fetchMoreData = async () => {
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page+1}&pageSize=${props.pageCount}`,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      }
    );
    setPage(page+1);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  // This executes after rendering the component

  useEffect(() => {
    document.title = `News Center - ${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    }`;
    updateNews();
    /* eslint-disable-next-line */
  },[]);

  const updateNews = async ()=> {
    props.setProgress(7);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageCount}`,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      });
    setLoading(true);
    props.setProgress(60);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    console.log(articles.length);
    console.log(totalResults);
  }



  // const componentDidMount = async () => {
  //   updateNews();
  // }

  // const handlePrevClick = async () => {
  //   console.log(page);
  //   setPage(page - 1);
  //   console.log(page);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   console.log(page);
  //   setPage(page + 1);
  //   console.log(page);
  //   updateNews();
  // };

  return (
    <>
      <h1 className="text-center heading">Top Headlines of India</h1>
      { loading && <Loading /> }
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element, index) => {
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
                </div>
              );
            })
        }

        {articles.length >= totalResults &&
          <p className="seen-all">
            <b>Yay! You have seen it all</b>
          </p>
        }
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="text-center my-4 d-flex justify-content-between">
        <button
          className="btn btn-dark"
          disabled={.page <= 1}
          onClick={this.handlePrevClick}
          style={{ textTransform: "none" }}
        >
          &larr; Previous
        </button>
        <button
          className="btn btn-dark"
          disabled={
            .page + 1 > Math.ceil(.totalResults / 15)
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


  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
    page: 1
  };
