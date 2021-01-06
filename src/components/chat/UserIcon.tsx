import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FaUsers} from 'react-icons/fa';

class UserIcon extends Component {

  render() {
    return (
      <div className="users-icon">
        <FaUsers size={30} onClick={this.props.toggleUserList} />
      </div>
    );
  }
}

export default UserIcon;
