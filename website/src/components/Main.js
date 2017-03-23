import React from 'react';
import Header from './Header';
import FileDropper from './FileDropper';
import ErrorList from './ErrorList';

import 'styles/main.scss';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = { errors: undefined }
  }

  updateErrors(errors) {
    this.setState({ errors });
  }

  normalizeDragHandle(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    const { errors } = this.state;

    return (
      <div
        className='index'
        onDragOver={evt => this.normalizeDragHandle(evt)}
        onDrop={evt => this.normalizeDragHandle(evt)}
      >
        <Header />
        <div className='container'>
          <FileDropper updateErrors={errors => this.updateErrors(errors)}/>
          <ErrorList errors={errors}/>
        </div>
      </div>
    );
  }
}
