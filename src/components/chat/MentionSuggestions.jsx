import React from "react";
import { connect } from "react-redux";
import { addSuggestion } from "../../actions/chatActions";
import { scrollIntoViewOptions } from "../../utils/suggestions";
import {
  ViewingUserIcon,
  OnlineUserIcon,
  OfflineUserIcon,
} from "./userlist";
const MentionSuggestions = ({ chat, addSuggestion }) => (
  <ul>
    {chat.suggestions.map((user, i) => {
      const activeItem = chat.highlightedSuggestion === i;
      const mention = user.name;
      const status = user.status;
      const viewing = status === "viewing";
      const online = status === "online";
      const props = {
        onClick: (e) => addSuggestion(mention),
        className: activeItem ? "active" : "",
      };
      if (activeItem) {
        props.ref = (item) => {
          if (item) item.scrollIntoView(scrollIntoViewOptions);
        };
      }
      return (
        <li {...props} key={i}>
          {viewing ? (
            <ViewingUserIcon />
          ) : online ? (
            <OnlineUserIcon />
          ) : (
            <OfflineUserIcon />
          )}
          {mention.slice(1)}
        </li>
      );
    })}
  </ul>
);

export default connect(({ chat }) => ({ chat }), { addSuggestion })(
  MentionSuggestions
);
