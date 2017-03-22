import React from 'react';
import Header from './Header';
import FileDropper from './FileDropper';

import 'styles/main.scss';

export default class Main extends React.Component {
  normalizeDragHandle(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    return (
      <div
        className='index'
        onDragOver={evt => this.normalizeDragHandle(evt)}
        onDrop={evt => this.normalizeDragHandle(evt)}
      >
        <Header />
        <div className='container'>
          <FileDropper />
        </div>
      </div>
    );
  }
}
