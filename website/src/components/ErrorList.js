import React from 'react';

import 'styles/errorList.scss';

export default class ErrorList extends React.Component {
  render() {
    const { errors } = this.props;

    return (
      <div className={`errorList ${errors === undefined ? '' : 'show'}`}>
        <p className='report-title'>Report</p>
        {
          (!errors || errors.length === 0) ? (
            <p>No error found in your configuration!</p>
          ) : (
            <div>
              <p className='counter'>{`${errors.length} error${errors.length > 1 ? 's' : ''} found in your configuration.`}</p>
              {
                errors.map((d, i) => (
                  <p key={i}>
                    <span style={{color: '#50C54f'}}>{d.property.replace('instantce.', '')}:</span>
                    {` ${d.message}`}
                  </p>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
