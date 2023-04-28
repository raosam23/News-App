import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  toCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(props) {
    super(props);
    // console.log("I am a constructor from the news
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `BR News - ${this.toCapitalize(this.props.category)}`;
  }

  updateNews = async () => {
    // this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    // this.props.setProgress(50);
    let parseData = await data.json();
    // this.props.setProgress(75);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    // this.props.setProgress(100); 
  };

  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f23c6480a5246e28477c57812811088&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading : false
    // });
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f23c6480a5246e28477c57812811088&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log("prev");
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading : false
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize)))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5f23c6480a5246e28477c57812811088&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading : true});
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   console.log("next");
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading : false
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async() => {
    this.setState({page : this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: [...this.state.articles, ...parseData.articles],
      totalResults: parseData.totalResults,
    });
  }

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "60px 0px 0px 0px" }}
        >{`BR News - Top ${
          this.props.category !== "general"
            ? this.toCapitalize(this.props.category)
            : ""
        } Headlines`}</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-3" key={index}>
                    <NewsItem
                      title={
                        element && element.title
                          ? element.title.slice(0, 45)
                          : ""
                      }
                      description={
                        element && element.description
                          ? element.description.slice(0, 85)
                          : ""
                      }
                      imageURL={element.urlToImage}
                      newsURL={element.url}
                      Author={element.author}
                      date={element.publishedAt}
                      Source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* {!this.state.loading && (
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        )} */}
      </>
    );
  }
}
