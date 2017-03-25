import React from 'react';
import fileDialog from 'file-dialog';
import validator from 'splunk-ucc-config-validator';
import 'styles/fileDropper.scss';

export default class FileDroper extends React.Component {
  constructor() {
    super();
    this.state = {
      isDragOver: false
    };
  }

  handlefileDialog() {
    fileDialog()
      .then(files => {
        this.handleFileInput(files);
      });
  }

  hadnleDrop(evt) {
    this.setState({isDragOver: false});
    evt.stopPropagation();
    evt.preventDefault();

    const files = evt.dataTransfer.files;
    this.handleFileInput(files);

  }

  handleFileInput(files) {
    if (files.length !== 1) {
      return alert('Just give me one file please :)');
    }

    const file = files[0];
    if (file.size > (1024 * 1024)) {
      return alert('Your file is bigger than 1MB, are you sure this is a configuration file? Contact davidguandev@gmail.com if you indeed need that support.');
    }
    if (file.type !== 'application/json') {
      return alert('Currently, only file in json format is supported.');
    }
    this.readFile(file);
  }

  readFile(file) {
    const { updateErrors } = this.props;
    const reader = new FileReader();
    reader.onload = evt => {
      let json;
      try {
        json = JSON.parse(evt.target.result);
      } catch (e) {
        return alert('the file\'s content isn\'t a valid JSON text');
      }
      updateErrors(validator.validate(json, { transformIndex: true }).errors);
    };

    reader.readAsText(file);
  }

  handleDragOver(evt, isDragOver) {
    evt.stopPropagation();
    evt.preventDefault();
    if (isDragOver !== this.state.isDragOver) {
      this.setState({isDragOver});
    }
  }

  render() {
    const { isDragOver } = this.state;

    return (
      <div className="fileDroper">
        <div
          className={`receiver ${isDragOver ? 'onDragOver' : ''}`}
          onClick={() => this.handlefileDialog()}
          onDragOver={evt => this.handleDragOver(evt, true)}
          onDragLeave={evt => this.handleDragOver(evt, false)}
          onDrop={evt => this.hadnleDrop(evt)}
        >
          <div>
            <p>Drop your configuration file here</p>
            <p>or</p>
            <p>Click here to open it</p>
          </div>
        </div>
      </div>
    );
  }
}
