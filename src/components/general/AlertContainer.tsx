import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'react-bootstrap';

// https://v4-alpha.getbootstrap.com/components/alerts/#examples
const alertStyles = ['success', 'danger', 'warning', 'info'];

class AlertContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let { message, alertStyle } = this.props;
    if (alertStyles.indexOf(alertStyle) === -1){
      alertStyle = 'success';
    }

    return (
      <div className="alert-container" ref="alert_container" style={{marginRight: '10px'}}>
        {message && <Alert
          variant={alertStyle}
          dismissible>
          {message}
        </Alert>}
      </div>
    );
  }
}

AlertContainer.propTypes = {
  message: PropTypes.string.isRequired,
  alertStyle: PropTypes.string
}

export default AlertContainer;
