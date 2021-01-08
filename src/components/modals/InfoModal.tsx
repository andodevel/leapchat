import React, { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";

interface InfoModalProps {
  showModal: boolean;
  toggleInfoModal: () => void;
}

const InfoModal: FunctionComponent<InfoModalProps> = ({
  showModal,
  toggleInfoModal,
}) => {
  return (
    <Modal show={showModal} onHide={toggleInfoModal}>
      <Modal.Header closeButton>
        <h4>Welcome to TiMess!</h4>
        <h6>An encrypted, ephemeral, in-browser chat based on LeapChat.</h6>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ad in minim eiusmod nostrud anim proident ipsum laboris. Duis esse
          eiusmod nostrud Lorem ea reprehenderit tempor. Ea et magna nulla
          exercitation commodo sint fugiat eiusmod anim. Qui exercitation cillum
          enim nulla duis consectetur eiusmod dolor. Lorem officia id irure
          adipisicing enim dolore dolor adipisicing duis dolore. Nostrud
          deserunt aute esse ipsum. Excepteur sit eu adipisicing quis ea non
          amet adipisicing ut sunt. Aliqua dolor adipisicing ut adipisicing
          exercitation. In laboris ex minim ad ipsum consectetur occaecat in
          officia do laborum cupidatat sunt. Aute voluptate Lorem magna mollit
          ea nulla quis elit culpa. In voluptate ut eiusmod labore dolore aute
          fugiat deserunt aute amet Lorem.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(InfoModal);
