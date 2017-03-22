import React from 'react';

import 'styles/header.scss';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>Splunk UCC configuration validator</h1>
      </div>
    );
  }
}
