import React from 'react';
import PropTypes from 'prop-types';

import './page.less';

export default class Page extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="page-head">YMUI</div>
        <div className="page-body">
          <div className="page-side-bar">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
};
