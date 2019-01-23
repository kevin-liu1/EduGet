import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/info.css'

import Header from './Header';

class Nomatch extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header/>
        <p className={styles.content}>404 page not found error, please check your address.</p>
      </div>
    );
  }
}

export default Nomatch;
