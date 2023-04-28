import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL, Author, date, Source } = this.props;
    return (
      <div className="my-3">   
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{zIndex : '1'}}>
            {Source}
          </span>
          <img src={!imageURL?"https://th.bing.com/th?id=OIP.CT2xzOkr1e0D77V51dvEHgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2":imageURL} className="card-img-top" alt="404 NOT FOUND" />
          <div className="card-body">
            <h5 className="card-title">{title?title+"...":null}</h5>
            <p className="card-text">{description?description+"...":null}</p>
            <p className="card-text"><small className="text-muted">{Author ? "By "+Author+" on" : "On"} {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div> 
      </div>
    );
  }
}

export default NewsItem;
