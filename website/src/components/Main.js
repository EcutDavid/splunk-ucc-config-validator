import React from 'react';
import Header from './Header';
import FileDropper from './FileDropper';

import 'styles/main.scss';

export default class Main extends React.Component {
  render() {
    return (
      <div className="index">
        <Header />
        <div className='container'>
          <FileDropper />
        </div>
      </div>
    );
  }
}
