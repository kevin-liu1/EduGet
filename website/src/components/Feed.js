import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import '../styles/App.css';


class Feed extends Component {
  render() {
    return (
      <div>
        <Header/>
        <p>Feed</p>
      </div>
    );
  }
}

export default Feed;
