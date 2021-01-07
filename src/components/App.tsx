import React, {
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  setUsername,
  initConnection,
  initChat,
} from "../actions/chatActions";

import Header from "./layout/Header";

import ChatContainer from "./chat/ChatContainer";

import UsernameModal from "./modals/Username";
import InfoModal from "./modals/InfoModal";
import PincodeModal from "./modals/PincodeModal";

import {
  SERVER_ERROR_PREFIX,
  AUTH_ERROR,
  ON_CLOSE_RECONNECT_MESSAGE,
  USER_STATUS_DELAY_MS,
} from "../constants/messaging";

const App: FunctionComponent<any> = () => {
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const [showPincodeModal, setShowPincodeModal] = useState(false);

  const dispatch = useDispatch();

  const {
    shouldConnect,
    messages,
    username,
    alertMessage,
    alertStyle,
    statuses,
    pincodeRequired,
    previousUsername,
  } = useSelector<any, any>((state) => ({
    ...state.chat,
    ...state.alert,
  }));

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    connectIfNeeded();
  });

  const connectIfNeeded = () => {
    if (!pincodeRequired && shouldConnect) {
      dispatch(initConnection());
    }
  };

  const handleShowSettings = () => {
    setShowUsernameModal(true);
  };

  const onClosePincodeModal = () => {
    setShowPincodeModal(false);
  };

  const onSetPincode = (pincode = "") => {
    if (!pincode || pincode.endsWith("--")) {
      // TODO: Bootstrap error?
      alert("Invalid pincode!");
      return;
    }
    dispatch(initConnection(pincode));
  };

  const onCloseUsernameModal = () => {
    setShowUsernameModal(false);
  };

  const handleSetUsername = (username) => {
    setShowUsernameModal(false);
    dispatch(setUsername(username));
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const onSendMessage = (message) => {
    dispatch(sendMessage({ message, username }));
  };

  const displaySettings =
    !pincodeRequired && (showUsernameModal || username === "");
  const chatInputFocus =
    !pincodeRequired && !showUsernameModal && username !== "";

  return (
    <div id="page">
      <Header
        statuses={statuses}
        showSettings={handleShowSettings}
        toggleInfoModal={toggleInfoModal}
      />

      <main className="encloser">
        {pincodeRequired && (
          <PincodeModal
            showModal={pincodeRequired}
            onSetPincode={onSetPincode}
            onCloseModal={onClosePincodeModal}
          />
        )}

        {displaySettings && (
          <UsernameModal
            previousUsername={previousUsername}
            username={username}
            showModal={displaySettings}
            onSetUsername={handleSetUsername}
            onCloseModal={onCloseUsernameModal}
          />
        )}

        <ChatContainer
          alertMessage={alertMessage}
          alertStyle={alertStyle}
          messages={messages}
          username={username}
          onSendMessage={onSendMessage}
          messageInputFocus={chatInputFocus}
        />

        <InfoModal
          showModal={showInfoModal}
          toggleInfoModal={toggleInfoModal}
        />
      </main>
    </div>
  );
};

export default App;
