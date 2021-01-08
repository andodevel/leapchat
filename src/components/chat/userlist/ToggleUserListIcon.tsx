import React, { FunctionComponent } from "react";
import { FaUsers } from "react-icons/fa";
import "./index.scss";

interface ToggleUserListIconProps {
  toggleUserList: () => void;
}

const ToggleUserListIcon: FunctionComponent<ToggleUserListIconProps> = ({
  toggleUserList,
}) => {
  return (
    <div className="header__toogle-userlist-icon">
      <FaUsers size={30} onClick={toggleUserList} />
    </div>
  );
};

export default React.memo(ToggleUserListIcon);
