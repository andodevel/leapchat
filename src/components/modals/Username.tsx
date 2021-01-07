import React, { FunctionComponent, useEffect, useState, useRef } from "react";

import { Modal, Button } from "react-bootstrap";

import { generateRandomUsername } from "../../data/username";

interface UsernameModalProps {
  showModal: boolean;
  previousUsername: string;
  username: string;
  onCloseModal: () => void;
  onSetUsername: (name: string) => void;
}

const UsernameModal: FunctionComponent<UsernameModalProps> = ({
  showModal,
  previousUsername,
  username,
  onCloseModal,
  onSetUsername,
}) => {
  const [usernameInput, setUsernameInput] = useState(previousUsername || "");
  const [failMessage, setFailMessage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const onUsernameKeyPress = (e) => {
    if (e.which === 13) {
      onSetUsernameClick();
    }
  };

  const isUsernameValid = (username) => {
    if (!username || username.length === 0) {
      setFailMessage("Must not be empty");
      return false;
    } else if (username.length > 45) {
      setFailMessage("Length must not exceed 45");
      return false;
    } else {
      return true;
    }
  };

  const onSetUsernameClick = () => {
    if (isUsernameValid(usernameInput)) {
      onSetUsername(usernameInput);
    }
  };

  const setRandomUsernameInForm = () => {
    const randomUsername = generateRandomUsername();
    setUsernameInput(randomUsername);
  };

  const displayFailAlert = () => {
    return { display: !!failMessage ? "block" : "none" };
  };

  return (
    <div>
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header>
          <Modal.Title>Set Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter username (e.g., trinity)"
              onKeyPress={onUsernameKeyPress}
              autoFocus={true}
            />
            <br />
            <div
              className="alert alert-danger"
              role="alert"
              style={displayFailAlert()}
            >
              <strong>Invalid Username: </strong>
              {failMessage}
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={setRandomUsernameInForm}
            >
              Generate Random Username
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {username && <Button onClick={onCloseModal}>Cancel</Button>}
          <Button onClick={onSetUsernameClick} variant="primary">
            Set Username
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsernameModal;
