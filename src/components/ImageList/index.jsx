import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class ImageList extends Component {
  render() {
    const props = this.props;

    return (
      <div className="pecahan">
        <h1>Pecahan yang tersedia</h1>
        <div className="row">
          {Object.keys(props.images).map(key => {
            return(
              <div key={key} className="col-xs-12 col-sm-4">
                <img src={props.images[key]} alt={`IMAGE-${key}`} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

ImageList.propTypes = {
  images: PropTypes.object
};

ImageList.defaultProps = {
  images: {}
};

export default ImageList;