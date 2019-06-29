import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Header extends Component {
  render() {
    const props = this.props;

    return(
      <header className="App-header">
        <h1 className="App-title">{props.title}</h1>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: 'Penghitung Pecahan Uang'
};

export default Header;