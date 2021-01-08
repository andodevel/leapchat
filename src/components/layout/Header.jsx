import React, { Component } from "react";
import UserList, { ToggleUserListIcon} from "../chat/userlist";
import Logo from "./Logo";
import Settings from "./Settings";
import Info from "./Info";
import { closePicker } from "../../actions/chatActions";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { displayUserList: false };
  }

  toggleUserList = () => {
    this.setState({ displayUserList: !this.state.displayUserList });
  };

  render() {
    const { closePicker, toggleInfoModal, showSettings, statuses } = this.props;
    return (
      <header onClick={closePicker}>
        <div className="header__bar">
          <ToggleUserListIcon toggleUserList={this.toggleUserList} />
          <div className="header__logo-info">
            <Logo />
            <Info toggleInfoModal={toggleInfoModal} />
          </div>
          <Settings showSettings={showSettings} />
        </div>
        <div className="header__content">
          <UserList
            statuses={statuses}
            displayUserList={this.state.displayUserList}
          />
        </div>
      </header>
    );
  }
}

export default connect(null, { closePicker })(Header);
