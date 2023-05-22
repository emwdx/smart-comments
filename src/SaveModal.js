import { Button, Modal, Row, Col } from 'react-bootstrap';

function SaveModal({ showSaveModal, setShowSaveModal, newCollectionName, setNewCollectionName, saveCollection }) {
  return (
    <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Save Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col> You have written comments for a collection that has not yet been saved. Enter a name for the new collection to save it. </Col>
        </Row>
        <input type="text" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} placeholder="Collection name" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={saveCollection}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveModal;
