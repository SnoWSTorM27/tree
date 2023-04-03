import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalWindow({ payload, onHide, ...rest }) {
  if (payload) {
    const { name } = payload.data;
    const { description, codeVideo } = payload.data.video;
    return (
      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ whiteSpace: "pre-wrap", textIndent: "0.5rem" }}>
            {description}
          </p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${codeVideo}`}
            allowFullScreen="1"
            title={name}
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  } else return null;
}
ModalWindow.propTypes = {
  payload: PropTypes.object,
  onHide: PropTypes.func
};
