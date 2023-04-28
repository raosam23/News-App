import "./App.css";
import NavBar from "./components/NavBar";
import News  from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
// import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  // state = {
  //   progress : 0
  // }
  pageSize = 12;
  apiKey = process.env.REACT_APP_NEWSAPP;
  // setProgress = (progress)=> {
  //   this.setState({progress : progress}); 
  // }
  render() {
    return (
      <Router>
        <NavBar />
        {/* <LoadingBar
        color='#f11946'
        height={4}
        progress={this.state.progress}
        // onLoaderFinished={10}
      /> */}
        <Routes>
          <Route exact path = "/" Component={()=> <News apiKey = {this.apiKey}/>} />
          <Route exact path="/business" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="business" />} />
          <Route exact path="/entertainment" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="entertainment" />} />
          {/* <Route exact path="/politics" Component={() => <News setProgress = {this.setProgress}setProgress = {setProgress} country="in" pageSize={this.pageSize} category="politics" />} /> */}
          <Route exact path="/health" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="health" />} />
          <Route exact path="/science" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="science" />} />
          <Route exact path="/sports" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="sports" />} />
          <Route exact path="/technology" Component={() => <News apiKey = {this.apiKey} country="in" pageSize={this.pageSize} category="technology" />} />
        </Routes>
      </Router>
    );
  }
}
