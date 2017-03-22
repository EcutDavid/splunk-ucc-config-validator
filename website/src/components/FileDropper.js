import React from 'react';

import 'styles/fileDropper.scss';

export default class FileDroper extends React.Component {
  render() {
    return (
      <div className="fileDroper">
        <div className='receiver'>Drop your configuration file here</div>
      </div>
    );
  }
}
