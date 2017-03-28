import React from 'react';
import Header from './Header';
import FileDropper from './FileDropper';
import ErrorList from './ErrorList';
import { connect } from 'react-redux';
import * as actions from '../actions';

import 'styles/main.scss';

export class Main extends React.Component {
  updateErrors(errors) {
    const { updateErrors } = this.props;
    updateErrors(errors);
  }

  normalizeDragHandle(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    const { errors } = this.props;

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

function mapStateToProps(state) {
  return state;
}

const ConnectedMain = connect(mapStateToProps, actions)(Main);
export default ConnectedMain;
