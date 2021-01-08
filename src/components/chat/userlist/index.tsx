import React, { FunctionComponent } from "react";
import "./index.scss";

import {
  ViewingUserIcon,
  OnlineUserIcon,
  OfflineUserIcon,
} from "./UserStatusIcons";
import ToggleUserListIcon from "./ToggleUserListIcon";

interface UserListProps {
  displayUserList: boolean;
  statuses: { username: string };
}

const UserList: FunctionComponent<UserListProps> = ({
  displayUserList,
  statuses
}) => {

  const styleUserList = () => {
    if (displayUserList) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };

  const sortByFrom = (username1, username2) => {
    return username1.toLowerCase().localeCompare(username2.toLowerCase());
  }

  const viewing = [];
  const online = [];
  const offline = [];

  Object.keys(statuses).forEach((username) => {
    const status = statuses[username];
    switch (status) {
    case "viewing":
      viewing.push(username);
      break;
    case "online":
      online.push(username);
      break;
    case "offline":
      offline.push(username);
      break;
    }
  });

  viewing.sort(sortByFrom);
  online.sort(sortByFrom);
  offline.sort(sortByFrom);

  return (
    <div className="userlist">
      <ul style={styleUserList()}>
        {viewing.map((username, i) => {
          return (
            <li key={i} className="userlist__user_viewing">
              <ViewingUserIcon/>
              <label>{username}</label>
            </li>
          );
        })}

        {online.map((username, i) => {
          return (
            <li key={i} className="userlist__user_online">
              <OnlineUserIcon />
              <label>{username}</label>
            </li>
          );
        })}

        {offline.map((username, i) => {
          return (
            <li key={i} className="use-list__user_offline">
              <OfflineUserIcon />
              <label>{username}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { ViewingUserIcon, OnlineUserIcon, OfflineUserIcon, ToggleUserListIcon };

export default UserList;

